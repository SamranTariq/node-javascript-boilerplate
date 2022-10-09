import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

import { logger } from '../utils/logger';

export const assignid = (req, res, next) => {
  req.id = uuidv4();
  next();
};

export const accessLogStream = () => {
  return fs.createWriteStream(
    path.join(__dirname + '../../../', 'access.log'),
    {
      flags: 'a',
    }
  );
};

export const developmentError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(`🎭 ${error}`);
  }
};
