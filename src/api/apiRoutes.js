// @flow
import express from 'express';
import { postTag } from 'api/controllers/tagController';
import { postTagValidation } from 'api/validation';

import type { Middleware } from 'express';

export const apiRoutes: Middleware = express.Router();

apiRoutes.post('/tag', postTagValidation, postTag);
