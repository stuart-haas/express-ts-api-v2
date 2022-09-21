import {
  Response,
  NextFunction,
} from 'express';
import {
  container, inject, InjectionToken, delay,
} from 'tsyringe';
import {
  AbstractMiddleware,
  IMiddleware,
  IApplication,
  IController, IRoute, IRouteProvider, Request, metaDataMiddleware,
} from 'core';
import { Application } from 'start';
import { PATH, ROUTES } from 'core/constants';
import { HttpProvider } from './HttpProvider';

export abstract class RouteProvider extends HttpProvider implements IRouteProvider {
  constructor(@inject(delay(() => Application)) protected application: IApplication) {
    super();
  }

  basePath: string;

  controllers: InjectionToken<IController>[];

  middleware: (IMiddleware | InjectionToken<AbstractMiddleware>)[];

  register(): void {
    const basePath = this.basePath ? `/${this.basePath}` : '';
    const providerMiddleware = this.resolveMiddelware(this.middleware || []);

    this.controllers.forEach((controller: InjectionToken<IController>) => {
      const controllerInstance = container.resolve(controller);
      const routes: IRoute[] = Reflect.getMetadata(ROUTES, controller);

      routes.forEach((route: IRoute) => {
        const controllerPath = Reflect.getMetadata(PATH, controller) !== '' ? `/${Reflect.getMetadata(PATH, controller)}` : '';
        const controllerMiddleware = this.resolveContextualMiddleware(controller, null);

        const routePath = route.path ? `/${route.path}` : '';
        const routeMiddleware = this.resolveContextualMiddleware(controller, route.action);

        const requestPath = `${basePath}${controllerPath}${routePath}`;

        this.application.server[route.httpMethod](requestPath,
          metaDataMiddleware(controller, route), providerMiddleware, controllerMiddleware, routeMiddleware,
          (req: Request, res: Response, next: NextFunction) => {
            controllerInstance[route.action](req, res, next);
          });
      });
    });
  }
}
