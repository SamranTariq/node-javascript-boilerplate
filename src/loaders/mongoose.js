import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { developmentError } from './helper';

export default async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', function (error) {
    developmentError(error);
  });

  mongoose.connection.on('open', function () {
    logger.info('✅ Connected to MongoDB database.');
  });

  return connection.connection;
};
