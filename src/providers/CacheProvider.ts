import { singleton } from 'tsyringe';
import { redisPort } from 'config/app';
import { IProvider } from 'core';
import { redisClient } from 'dataSources/InMemoryDataSource';

@singleton()
export class CacheProvider implements IProvider {
  register(): void {
    redisClient.on('connect', () => {
      console.log(`Redis client connected on port ${redisPort}`);
    });

    redisClient.on('error', (error) => {
      console.log('Redist client is unable to connect:', error);
    });
  }
}
