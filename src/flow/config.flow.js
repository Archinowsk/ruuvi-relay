// @flow

export type Config = {|
  +port: number,
  +debug: boolean,
  +logDir: string,
  +enableAccessLog: boolean,
  +dbConnString: string,
|};
