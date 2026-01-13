import 'reflect-metadata';
import { buildApp } from './app';
import { env } from './config/env';

const PORT = Number(env.PORT);
const HOST =  '0.0.0.0';

async function startServer() {
  try {
    const app = buildApp();

    await app.listen({ port: PORT, host: HOST });
    console.log(`Server is running at http://${HOST}:${PORT}`);
  }catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();