// @flow
import { validationResult } from 'express-validator';
import { logger } from 'utils/logger';
import type { TagRequest } from 'flow/tag.flow';
import type { $Request, $Response, Middleware } from 'express';

// Add favorite data for user
const postTag: Middleware = async (
  req: $Request,
  res: $Response
): Promise<void> => {
  logger.info('API call: POST /api/tag');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const tagRequest: TagRequest = req.body;
  logger.info(JSON.stringify(tagRequest, null, 2));
  return res.sendStatus(200);
};

export { postTag };
