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
    assert.deepEqual(Object.keys(contract.paths).sort(), ['/', '/health']);
    assert.ok(!contract.paths['/api/contact']);

    const uiResponse = await fetch(`${baseUrl}/api-docs/`);
    assert.equal(uiResponse.status, 200);
    assert.match(uiResponse.headers.get('content-type'), /text\/html/);
    const uiHtml = await uiResponse.text();
    assert.match(uiHtml, /<title>Swagger UI<\/title>/);
    assert.match(uiHtml, /swagger-ui-bundle\.js/);
    assert.equal(mongoConnections, 0);
  });
});

test('returns 404 for the removed contact endpoint', async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Visitor', email: 'visitor@example.test', message: 'Hello' })
    });
    assert.equal(response.status, 404);
  });
});
