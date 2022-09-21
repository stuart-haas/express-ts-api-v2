import {
  IApplication, IController, IRouteProvider, RouteProvider,
} from 'core';
import { HealthCheckController } from 'modules/healthCheck/HealthCheckController';
import { Application } from 'start';
import {
  inject, InjectionToken, singleton, delay,
} from 'tsyringe';

@singleton()
export class HealthCheckProvider extends RouteProvider implements IRouteProvider {
  constructor(@inject(delay(() => Application)) protected application: IApplication) {
    super(application);
  }

  basePath = '';

  controllers: InjectionToken<IController>[] = [
    HealthCheckController,
  ];
}
