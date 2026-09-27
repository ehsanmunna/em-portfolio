const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const { createContactEmailSender } = require('./contact-mailer');
const openApiDocument = require('./openapi.json');

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const mongoHost = process.env.MONGO_HOST || 'mongodb';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'portfolio';
const mongoUsername = process.env.MONGO_USERNAME || 'portfolio_admin';
const mongoPassword = process.env.MONGO_PASSWORD || 'portfolio_password';
const mongoUri = process.env.MONGO_URI || `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDbName}?authSource=admin`;

let mongoClient;

async function connectToMongo() {
  if (mongoClient) {
    return mongoClient;
  }

  mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  return mongoClient;
}

function validateContactSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'A JSON object is required.' };
  }

  const { name, email, message } = body;
  if ([name, email, message].some((value) => typeof value !== 'string')) {
    return { error: 'Name, email, and message are required.' };
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  };

  if (!submission.name || !submission.email || !submission.message) {
    return { error: 'Name, email, and message are required.' };
  }
  if (submission.name.length > 120 || submission.email.length > 254 || submission.message.length > 5000) {
    return { error: 'One or more contact fields exceed the allowed length.' };
  }
  if (/\r|\n/.test(submission.name) || /\r|\n/.test(submission.email)) {
    return { error: 'Contact fields contain invalid characters.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return { error: 'A valid email address is required.' };
  }

  return { submission };
}

function createContactRateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: { code: 'rate_limit_exceeded', message: 'Too many contact requests. Try again later.' }
    }
  });
}

function createApp({
  getMongoClient = connectToMongo,
  sendContactEmail,
  allowedOrigins = process.env.ALLOWED_ORIGINS || '',
  contactLimiter = createContactRateLimiter()
} = {}) {
  const app = express();
  app.locals.sendContactEmail = sendContactEmail;
  const originAllowlist = new Set(
    (Array.isArray(allowedOrigins) ? allowedOrigins : allowedOrigins.split(','))
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
  const contactCors = cors({
    origin(origin, callback) {
      callback(null, origin && originAllowlist.has(origin) ? origin : false);
    },
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204
  });
  const enforceAllowedOrigin = (req, res, next) => {
    const origin = req.get('Origin');
    if (origin && !originAllowlist.has(origin)) {
      return res.status(403).json({
        error: { code: 'origin_not_allowed', message: 'This origin cannot submit contact requests.' }
      });
    }
    return next();
  };

  app.get('/openapi.json', (req, res) => {
    res.json(openApiDocument);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.get('/health', async (req, res) => {
    try {
      const client = await getMongoClient();
      const db = client.db(mongoDbName);
      const pingResult = await db.command({ ping: 1 });

      if (pingResult.ok !== 1) {
        throw new Error('MongoDB ping failed');
      }

      res.status(200).json({
        status: 'ok',
        service: 'portfolio-api',
        database: mongoDbName,
        mongo: { host: mongoHost, port: mongoPort }
      });
    } catch (error) {
      res.status(503).json({
        status: 'error',
        service: 'portfolio-api',
        message: 'Database unavailable',
        error: error.message
      });
    }
  });

  app.options('/api/contact', enforceAllowedOrigin, contactCors);
  app.post(
    '/api/contact',
    enforceAllowedOrigin,
    contactCors,
    contactLimiter,
    express.json({ limit: '16kb' }),
    async (req, res) => {
      const validation = validateContactSubmission(req.body);
      if (validation.error) {
        return res.status(400).json({
          error: { code: 'invalid_contact_request', message: validation.error }
        });
      }

      try {
        if (typeof sendContactEmail !== 'function') {
          throw new Error('Contact mail transport is not configured');
        }
        await sendContactEmail(validation.submission);
        return res.status(202).json({ status: 'accepted' });
      } catch {
        return res.status(503).json({
          error: {
            code: 'delivery_unavailable',
            message: 'Unable to send your message right now.'
          }
        });
      }
    }
  );

  app.get('/', (req, res) => {
    res.json({
      name: 'Portfolio API',
      status: 'running',
      mongo: {
        host: mongoHost,
        port: mongoPort,
        database: mongoDbName
      }
    });
  });

  app.use((error, req, res, next) => {
    if (req.path !== '/api/contact') {
      return next(error);
    }
    if (error.type === 'entity.too.large') {
      return res.status(413).json({
        error: { code: 'request_too_large', message: 'Request body is too large.' }
      });
    }
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({
        error: { code: 'invalid_json', message: 'A valid JSON request body is required.' }
      });
    }
    return next(error);
  });

  return app;
}

async function startServer({ sendContactEmail = createContactEmailSender() } = {}) {
  const app = createApp({ sendContactEmail });
  app.listen(port, () => {
    console.log(`Portfolio API listening on http://localhost:${port}`);
    console.log(`MongoDB connection: ${mongoUri}`);
  });

  try {
    await connectToMongo();
    console.log(`Connected to MongoDB at ${mongoHost}:${mongoPort}`);
  } catch (error) {
    console.warn(`MongoDB not ready yet: ${error.message}`);
  }
}

if (require.main === module) {
  startServer();

  process.on('SIGINT', async () => {
    if (mongoClient) {
      await mongoClient.close();
    }
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    if (mongoClient) {
      await mongoClient.close();
    }
    process.exit(0);
  });
}

module.exports = { createApp, connectToMongo, startServer };
