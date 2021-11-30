const pino = require('pino');

module.exports = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      colorize: true,
    },
  },
});
