export const appName = process.env.APP_NAME;
export const appEnv = process.env.APP_ENV;
export const nodeEnv = process.env.NODE_ENV;
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const port = process.env.PORT;
export const sessionSecret = process.env.SESSION_SECRET;
export const jwtSecret = process.env.JWT_SECRET;
export const redisUrl = process.env.REDIS_URL;
export const redisPort = process.env.REDIS_PORT;
export const clientUrl = process.env.CLIENT_URL;
export const loginTokenExpiration = '24h';
export const tokenBlacklistExpiration = 60 * 60 * 24;
export const cryptoBufferSize = 64;
export const migrationsPath = 'src/migrations';
export const seedersPath = 'src/seeders';
export const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};
