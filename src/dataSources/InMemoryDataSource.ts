import { isDev, redisUrl, redisPort } from 'config/app';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import Redis from 'ioredis';

const url = isDev ? `${redisUrl}:${redisPort}` : redisUrl;

export const redisClient = new Redis(url, {
  maxRetriesPerRequest: null,
});
