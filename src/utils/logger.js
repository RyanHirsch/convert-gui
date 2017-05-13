import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { app } from 'electron';
import { isTest, isDevelopment } from './env';

function getTransports() {
  if(isTest()) {
    return [];
  }
  return [
    new (winston.transports.Console)({ level: 'silly', timestamp: true, colorize: true }),
    new winston.transports.DailyRotateFile({
      filename: path.join(app.getPath('appData'), 'log'),
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      timestamp: true,
      level: isDevelopment() ? 'debug' : 'info', // eslint-disable-line no-process-env
    }),
  ];
}

const logger = new (winston.Logger)({
  transports: getTransports(),
});

export default logger;
