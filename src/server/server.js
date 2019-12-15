// @flow
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'config';
import { logger, stream } from 'utils/logger';
import { apiRoutes } from 'api/apiRoutes';
import type { $Request, $Response, NextFunction, $Application } from 'express';

export const startServer = async (): Promise<$Application<>> => {
  const server = express();

  server.use(helmet());

  if (config.enableAccessLog) {
    logger.info("Express: Overriding 'Express' logger");
    // $FlowFixMe: Cannot call `morgan` with object literal bound to `options` because `$winstonLogger` [1] is incompatible with undefined [2] in property `stream.write`.
    server.use(morgan('dev', { stream }));
  }

  // Parse body and populate req.body - only accepts JSON
  server.use(bodyParser.json({ limit: '1000kb', type: '*/*' }));

  server.use(
    '/',
    (err: Error, req: $Request, res: $Response, next: NextFunction) => {
      if (err) {
        return res.sendStatus(400);
      } else {
        return next();
      }
    }
  );

  server.use('/api', apiRoutes);

  server.set('port', config.port);

  return server;
};

export const closeServer = async (server: $Application<>): Promise<void> => {};
