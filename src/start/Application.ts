import express from 'express';
import { container, InjectionToken, singleton } from 'tsyringe';
import dotenv from 'dotenv';

dotenv.config();

/* eslint-disable import/first */
import { port } from 'config/app';
import { IApplication, IProvider } from 'core';
import {
  CacheProvider, DatabaseProvider, MiddlewareProvider, ApiRouteProvider, ErrorProvider, AuthProvider, HealthCheckProvider,
} from 'providers';
/* eslint-enable import/first */

@singleton()
export class Application implements IApplication {
  server: express.Application;

  providers: InjectionToken<IProvider>[] = [
    DatabaseProvider,
    CacheProvider,
    MiddlewareProvider,
    AuthProvider,
    ApiRouteProvider,
    HealthCheckProvider,
    ErrorProvider,
  ];

  constructor() {
    this.server = express();
  }

  registerProviders() {
    this.providers.forEach((provider: InjectionToken<IProvider>) => {
      const instance = container.resolve(provider);
      instance.register();
    });
  }

  start(): void {
    this.server.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  }
}
