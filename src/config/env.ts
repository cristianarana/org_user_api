import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3001,

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'org_user_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
};