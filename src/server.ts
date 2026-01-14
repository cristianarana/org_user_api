import 'dotenv/config';
import 'reflect-metadata';

import { buildApp } from './app';
import { env } from './config/env';
import { poolDb }  from './db/data-source';

const PORT = Number(env.PORT);
const HOST =  '0.0.0.0';

async function startServer() {
  try {
    console.log("Connecting to the database...", env.db.user, env.db.password);
    await poolDb.query('SELECT 1');
    console.log('Database connected successfully');

    const app = buildApp();

    await app.listen({ port: PORT, host: HOST });
    console.log(`Server is running at http://${HOST}:${PORT}`);


  }catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();