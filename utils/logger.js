const winston = require('winston');

// Define log levels and corresponding colors
const logLevels = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Configure Winston logger
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.level}] ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Usage examples:
// logger.error('This is an error message');
// logger.warn('This is a warning message');
// logger.info('This is an info message');
// logger.debug('This is a debug message');


// Asynchronous logging function
const logAsync = async (level, message) => {
    return new Promise((resolve, reject) => {
      logger.log(level, message, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
  

module.exports = logger;
