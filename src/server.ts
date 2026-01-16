import 'dotenv/config';
import 'reflect-metadata';

import { buildApp } from './app';
import { env } from './config/env';
import { AppDataSource }  from './db/typeorm.datasource';
import userRoutes from './modules/users/user.routes';

const PORT = Number(env.PORT);
const HOST =  '0.0.0.0';

async function startServer() {
  try {
    console.log("Connecting to the database...");
      await AppDataSource.initialize();
      console.log("Database connection established via TypeORM.");


    const app = buildApp();

    app.register(userRoutes);

    await app.listen({ port: PORT, host: HOST });
    console.log(`Server is running at http://${HOST}:${PORT}`);


  }catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();