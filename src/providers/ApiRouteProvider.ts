import {
  inject, InjectionToken, singleton, delay,
} from 'tsyringe';
import {
  AbstractMiddleware,
  IMiddleware,
  IApplication,
  IController, IRouteProvider, RouteProvider,
} from 'core';
import { Application } from 'start';
import { AuthGuard, RoleGuard } from 'auth';
import { ValidateMiddleware } from 'middleware';
import { API_BASE_PATH } from 'core/constants';

import AuthController from 'modules/auth/AuthController';
import RoleController from 'modules/roles/RoleController';
import UserController from 'modules/users/UserController';

@singleton()
export class ApiRouteProvider extends RouteProvider implements IRouteProvider {
  constructor(@inject(delay(() => Application)) protected application: IApplication) {
    super(application);
  }

  basePath = API_BASE_PATH;

  controllers: InjectionToken<IController>[] = [
    AuthController,
    RoleController,
    UserController,
  ];

  middleware: (IMiddleware | InjectionToken<AbstractMiddleware>)[] = [
    AuthGuard,
    RoleGuard,
    ValidateMiddleware,
  ];
}
