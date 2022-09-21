import * as config from 'config/db';
import { singleton } from 'tsyringe';
import { IProvider } from 'core';
import { databaseClient } from 'dataSources/SqlDataSource';

@singleton()
export class DatabaseProvider implements IProvider {
  register(): void {
    databaseClient
      .authenticate()
      .then(() => {
        console.log(`Database client connected on port ${config.port}`);
      })
      .catch((err) => {
        console.log('Database client is unable to connect:', err);
      });
  }
}
