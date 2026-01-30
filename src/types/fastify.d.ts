import 'fastify';
import { DataSource, Repository  } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    orm: DataSource;
  }
}