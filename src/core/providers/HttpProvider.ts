import {
  AbstractMiddleware, AbstractErrorMiddleware, Request, IController, IErrorMiddleware, IMiddleware,
} from 'core';
import { MIDDLEWARE } from 'core/constants';
import { Response, NextFunction } from 'express';
import { container, InjectionToken } from 'tsyringe';

export abstract class HttpProvider {
  protected resolveMiddelware(middlewares: (IMiddleware | IErrorMiddleware | InjectionToken<AbstractMiddleware>)[]): (IMiddleware | IErrorMiddleware | InjectionToken<AbstractMiddleware>)[] {
    return middlewares.map((middleware: IMiddleware | IErrorMiddleware | InjectionToken<AbstractMiddleware>) => {
      try {
        const m = container.resolve(middleware as InjectionToken<AbstractMiddleware>);
        return ((req: Request, res: Response, next: NextFunction) => m.use(req, res, next));
      } catch (err) {
        return middleware;
      }
    });
  }

  protected resolveErrorMiddelware(middlewares: (IErrorMiddleware | InjectionToken<AbstractErrorMiddleware>)[]): (IErrorMiddleware | InjectionToken<AbstractErrorMiddleware>)[] {
    return middlewares.map((middleware: IErrorMiddleware | InjectionToken<AbstractErrorMiddleware>) => {
      try {
        const m = container.resolve(middleware as InjectionToken<AbstractErrorMiddleware>);
        return ((error: Error, req: Request, res: Response, next: NextFunction) => m.use(error, req, res, next));
      } catch (err) {
        return middleware;
      }
    });
  }

  protected resolveContextualMiddleware(controller: InjectionToken<IController>, action: string): (IMiddleware | AbstractMiddleware)[] {
    const middlewares = Reflect.getMetadata(MIDDLEWARE, controller, action) || ((req: Request, res: Response, next: NextFunction) => next());
    return middlewares.map((middleware: IMiddleware | AbstractMiddleware) => {
      if (middleware instanceof AbstractMiddleware) {
        return ((req: Request, res: Response, next: NextFunction) => middleware.use(req, res, next));
      }
      return middleware;
    });
  }
}
