import fp from 'fastify-plugin';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../db/typeorm.datasource';

export const ormPlugin = fp(async (fastify) => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

  fastify.decorate('orm', AppDataSource);
});
