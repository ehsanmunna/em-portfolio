const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
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

function createApp({
  getMongoClient = connectToMongo
} = {}) {
  const app = express();

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

  return app;
}

async function startServer() {
  const app = createApp();
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
