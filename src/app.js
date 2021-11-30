const express = require('express');
const expressPinoLogger = require('express-pino-logger');
const { createServer } = require('http');
const cors = require('cors');
let config = require('config');
config = config.get('config');

const logger = require('./utils/logger');
const { version } = require('../package.json');

const corsOrigin = config.get('corsOrigin');
const port = config.get('port');
const host = config.get('host');

const app = express();

// ! Configure Express-pino-logger ➡️
const loggerMidlleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});
app.use(loggerMidlleware);
// ! Express-pino-logger configration ⬅️

const httpServer = createServer(app);

app.get('/', (_, res) => res.send(`server is up on version ${version}`));

httpServer.listen(port, host, () => {
  logger.info(`🚀 Server version ${version} is running 🛼`);
  logger.info(`http://${host}:${port}`);
});
