const assert = require('node:assert/strict');
const { once } = require('node:events');
const test = require('node:test');
const { createApp } = require('../src/server');

async function withServer(options, run) {
  const server = createApp(options).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    return await run(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}

function contactRequest(baseUrl, payload, origin) {
  return fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(origin ? { origin } : {})
    },
    body: JSON.stringify(payload)
  });
}

test('accepts a valid inquiry and sends normalized values to the mailer', async () => {
  let received;
  await withServer({
    sendContactEmail: async (submission) => { received = submission; }
  }, async (baseUrl) => {
    const response = await contactRequest(baseUrl, {
      name: '  Visitor  ',
      email: ' visitor@example.test ',
      message: '  Hello there  '
    });

    assert.equal(response.status, 202);
    assert.deepEqual(await response.json(), { status: 'accepted' });
    assert.deepEqual(received, {
      name: 'Visitor',
      email: 'visitor@example.test',
      message: 'Hello there'
    });
  });
});

test('rejects invalid fields and header injection without sending email', async () => {
  let deliveries = 0;
  await withServer({
    sendContactEmail: async () => { deliveries += 1; }
  }, async (baseUrl) => {
    const invalidSubmissions = [
      { name: '', email: 'visitor@example.test', message: 'Hello' },
      { name: 'Visitor', email: 'not-an-email', message: 'Hello' },
      { name: 'Visitor\r\nBcc: other@example.test', email: 'visitor@example.test', message: 'Hello' },
      { name: 'Visitor', email: 'visitor@example.test', message: 'x'.repeat(5001) }
    ];

    for (const submission of invalidSubmissions) {
      const response = await contactRequest(baseUrl, submission);
      assert.equal(response.status, 400);
      assert.equal((await response.json()).error.code, 'invalid_contact_request');
    }
  });
  assert.equal(deliveries, 0);
});

test('returns 413 for a request body over 16 KiB', async () => {
  await withServer({ sendContactEmail: async () => assert.fail('oversized request must not send email') }, async (baseUrl) => {
    const response = await contactRequest(baseUrl, {
      name: 'Visitor',
      email: 'visitor@example.test',
      message: 'x'.repeat(17 * 1024)
    });

    assert.equal(response.status, 413);
    assert.equal((await response.json()).error.code, 'request_too_large');
  });
});

test('returns a generic error when SMTP delivery fails', async () => {
  await withServer({
    sendContactEmail: async () => { throw new Error('private SMTP credential detail'); }
  }, async (baseUrl) => {
    const response = await contactRequest(baseUrl, {
      name: 'Visitor',
      email: 'visitor@example.test',
      message: 'Hello'
    });
    const responseText = await response.text();

    assert.equal(response.status, 503);
    assert.match(responseText, /delivery_unavailable/);
    assert.doesNotMatch(responseText, /private SMTP credential detail/);
  });
});

test('allows configured CORS preflight and rejects other origins', async () => {
  await withServer({
    allowedOrigins: 'http://portfolio.example.test',
    sendContactEmail: async () => {}
  }, async (baseUrl) => {
    const allowed = await fetch(`${baseUrl}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        origin: 'http://portfolio.example.test',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'content-type'
      }
    });
    assert.equal(allowed.status, 204);
    assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://portfolio.example.test');
    assert.equal(allowed.headers.get('access-control-allow-methods'), 'POST');
    assert.equal(allowed.headers.get('access-control-allow-headers'), 'Content-Type');

    const rejected = await fetch(`${baseUrl}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        origin: 'http://untrusted.example.test',
        'access-control-request-method': 'POST'
      }
    });
    assert.equal(rejected.status, 403);
    assert.equal(rejected.headers.get('access-control-allow-origin'), null);
  });
});

test('limits contact submissions to five requests per IP per window', async () => {
  let deliveries = 0;
  await withServer({
    sendContactEmail: async () => { deliveries += 1; }
  }, async (baseUrl) => {
    const responses = [];
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const response = await contactRequest(baseUrl, {
        name: 'Visitor',
        email: 'visitor@example.test',
        message: 'Hello'
      });
      responses.push(response.status);
    }

    assert.deepEqual(responses, [202, 202, 202, 202, 202, 429]);
  });
  assert.equal(deliveries, 5);
});

test('serves OpenAPI and Swagger UI without connecting to MongoDB', async () => {
  let mongoConnections = 0;
  await withServer({
    getMongoClient: async () => {
      mongoConnections += 1;
      throw new Error('Documentation routes must not connect to MongoDB');
    }
  }, async (baseUrl) => {
    const contractResponse = await fetch(`${baseUrl}/openapi.json`);
    assert.equal(contractResponse.status, 200);
    assert.match(contractResponse.headers.get('content-type'), /application\/json/);
    const contract = await contractResponse.json();
    assert.equal(contract.openapi, '3.0.3');
    assert.deepEqual(Object.keys(contract.paths).sort(), ['/', '/api/contact', '/health']);

    const uiResponse = await fetch(`${baseUrl}/api-docs/`);
    assert.equal(uiResponse.status, 200);
    assert.match(uiResponse.headers.get('content-type'), /text\/html/);
    const uiHtml = await uiResponse.text();
    assert.match(uiHtml, /<title>Swagger UI<\/title>/);
    assert.match(uiHtml, /swagger-ui-bundle\.js/);
    assert.equal(mongoConnections, 0);
  });
});

test('documents current contact responses and preserves origin checks', async () => {
  let deliveries = 0;
  await withServer({
    allowedOrigins: ['http://portfolio.example.test'],
    sendContactEmail: async () => { deliveries += 1; }
  }, async (baseUrl) => {
    const contract = await (await fetch(`${baseUrl}/openapi.json`)).json();
    const contactOperation = contract.paths['/api/contact'].post;
    const contactSchema = contract.components.schemas.ContactSubmission;

    assert.deepEqual(contactSchema.required, ['name', 'email', 'message']);
    assert.equal(contactSchema.properties.name.maxLength, 120);
    assert.equal(contactSchema.properties.email.maxLength, 254);
    assert.equal(contactSchema.properties.message.maxLength, 5000);
    assert.deepEqual(
      Object.keys(contactOperation.responses).sort(),
      ['202', '400', '403', '413', '429', '503']
    );
    const expectedErrorCodes = {
      400: ['invalid_json', 'invalid_contact_request'],
      403: ['origin_not_allowed'],
      413: ['request_too_large'],
      429: ['rate_limit_exceeded'],
      503: ['delivery_unavailable']
    };
    for (const [status, codes] of Object.entries(expectedErrorCodes)) {
      const description = contactOperation.responses[status].description;
      for (const code of codes) {
        assert.ok(description.includes(code), `${status} response documents ${code}`);
      }
    }
    assert.ok(contactOperation.responses['413'].description.includes('16 KiB'));
    assert.ok(contract.paths['/health'].get.responses['503']);
    assert.ok(contract.paths['/'].get.responses['200']);

    const response = await contactRequest(baseUrl, {
      name: 'Visitor',
      email: 'visitor@example.test',
      message: 'Hello'
    }, baseUrl);
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error.code, 'origin_not_allowed');
  });
  assert.equal(deliveries, 0);
});
