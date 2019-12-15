// @flow
import type { Config } from 'flow/config.flow';

const commonConfig = {
  // Server settings
  port:
    typeof process.env.PORT === 'string'
      ? parseInt(process.env.PORT, 10)
      : 3000,
  debug: false,

  // Logging
  logDir: './logs',
  enableAccessLog: false,
};

const prodConfig = {
  dbConnString: process.env.CONN_STRING || '',
};

const stagingConfig = {
  dbConnString: process.env.CONN_STRING || '',
};

const devConfig = {
  dbConnString: '',
};

const combineConfig = () => {
  if (process.env.SETTINGS === 'production') {
    return { ...commonConfig, ...prodConfig };
  } else if (process.env.SETTINGS === 'staging') {
    return { ...commonConfig, ...stagingConfig };
  }
  return { ...commonConfig, ...devConfig };
};

export const config: Config = combineConfig();
