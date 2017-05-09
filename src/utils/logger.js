import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { app } from 'electron';

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(app.getPath('appData'), 'log'),
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  timestamp: true,
  level: process.env.ENV === 'development' ? 'debug' : 'info', // eslint-disable-line no-process-env
});

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'silly', timestamp: true, colorize: true }),
    transport,
  ],
});

export default logger;
