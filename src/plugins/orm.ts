import fp from 'fastify-plugin';
import { AppDataSource } from '../db/typeorm.datasource';

export const ormPlugin = fp(async (fastify) => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

  fastify.decorate('orm', AppDataSource);

  fastify.addHook('onClose', async () => {
    await AppDataSource.destroy();
  });
});
