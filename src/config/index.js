import dotenv from 'dotenv';

dotenv.config();

export const server_secrets = {
  corsOrigin: process.env.CORSORIGIN || 'http://localhost:3000',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
};
