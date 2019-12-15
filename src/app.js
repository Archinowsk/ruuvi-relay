// @flow
import { startServer } from 'server/server';
import { logger } from 'utils/logger';

const startApp = async (): Promise<void> => {
  const server = await startServer();

  const app = server.listen(server.get('port'), () => {
    if (!app) return;
    logger.info(`Express: Server started on port ${app.address().port}`);
  });
};

const init = (): void => {
  if (typeof process.env.NODE_ENV === 'string') {
    logger.info(`Node environment: ${process.env.NODE_ENV}`);
  } else {
    throw new Error(`Node environment NODE_ENV missing`);
  }

  startApp();
};

init();
