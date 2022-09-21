import { AbstractMiddleware, defineMiddleware, IMiddleware } from 'core';
import { container, InjectionToken } from 'tsyringe';

export const Middleware = (middleware: IMiddleware | IMiddleware[] | InjectionToken<AbstractMiddleware> | InjectionToken<AbstractMiddleware>[]): MethodDecorator & ClassDecorator => (target, propertyKey?: string, descriptor?: PropertyDescriptor): void => {
  const resolve = (mw) => {
    try {
      const m = container.resolve(mw as InjectionToken<AbstractMiddleware>);
      if (descriptor) {
        defineMiddleware(target.constructor, propertyKey, m);
      } else {
        defineMiddleware(target, null, m);
      }
    } catch (err) {
      if (descriptor) {
        defineMiddleware(target.constructor, propertyKey, middleware as IMiddleware | IMiddleware[]);
      } else {
        defineMiddleware(target, null, middleware as IMiddleware | IMiddleware[]);
      }
    }
  };

  if (Array.isArray(middleware)) {
    middleware.forEach((m) => {
      resolve(m);
    });
  } else {
    resolve(middleware);
  }
};
