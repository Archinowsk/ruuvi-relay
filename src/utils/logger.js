// @flow
import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import 'winston-daily-rotate-file';
import { config } from 'config';

// $FlowFixMe: property `errors` is missing in `$winstonFormatSubModule` [1].
const { combine, printf, colorize, timestamp, json, errors } = format;
const { logDir, debug } = config;

// Create logs directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const loggerLevel = (): string => {
  if (debug) return 'debug';
  else return 'info';
};

const formatMessage = (message: string | Object): string => {
  if (message && message.constructor === Object) {
    return JSON.stringify(message);
  }
  return message;
};

// $FlowFixMe: Missing type annotation for `T`. `T` is a type parameter declared in function type [1] and was implicitly instantiated at call of `createLogger` [2].
export const logger = createLogger({
  format: errors({ stack: true }),
  transports: [
    // $FlowFixMe: Cannot get `transports.DailyRotateFile` because property `DailyRotateFile` is missing in object type [1].
    new transports.DailyRotateFile({
      level: 'info', // info, debug, warn, error
      filename: `${logDir}/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      // maxFiles: '14d',
      zippedArchive: false,
      format: combine(timestamp(), json()),
    }),

    new transports.Console({
      level: loggerLevel(),
      format: combine(
        colorize(),
        timestamp({
          format: 'HH:mm:ss',
        }),
        printf(info => {
          return `${info.timestamp} ${info.level}: ${formatMessage(
            info.message
          )}`;
        })
      ),
    }),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message: string) => logger.info(message.slice(0, -1)), // Slice to remove line break
};
