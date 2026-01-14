import Fastify from 'fastify';
import { logger } from './config/logger';
import { env } from './config/env';
import { registerSwagger } from './plugins/swagger';

export function buildApp(){
    const app = Fastify({ 
        logger
     });

     if (env.nodeEnv !== 'production') {
    registerSwagger(app);
  }

     app.get('/health', async () => {
        return { status: 'ok' };
    });

    return app;
}

