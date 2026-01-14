import { Pool } from 'pg';
import { env } from '../config/env';

export const poolDb = new Pool({
  user: env.db.user,
  host: env.db.host,
  database: env.db.name,
  password: env.db.password,
  port: env.db.port,
});