import { builtinModules } from 'module';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import { logger } from '../utils/logger';

const loaders = async ({ expressApp }) => {
  try {
    const mongoConnection = await mongooseLoader();
    logger.info('🥭 MongoDB Initialized');
    await expressLoader({ app: expressApp });
    logger.info('🚌 Express Initialized');
    // ... more loaders can be here
    // ... Initialize agenda
    // ... or Redis, or whatever you want
  } catch (error) {
    logger.error(`⚠️ ${error}`);
  }
};

module.exports = loaders;
