function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3001,

  db: {
    host: required(process.env.DB_HOST || 'localhost'),
    port: Number(process.env.DB_PORT) || 5432,
    name: required(process.env.DB_NAME || 'org_user_db'),
    user: required(process.env.DB_USER || 'postgres'),
    password: required(process.env.DB_PASSWORD || 'abc1234'),
  },
};