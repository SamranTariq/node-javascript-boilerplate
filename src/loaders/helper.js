import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

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
