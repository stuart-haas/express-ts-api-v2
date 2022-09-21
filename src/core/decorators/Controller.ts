import { defineMiddleware, IMiddleware } from 'core';
import { PATH, ROUTES } from 'core/constants';

export const Controller = (path = '', middleware?: IMiddleware | IMiddleware[]): ClassDecorator => (target): void => {
  Reflect.defineMetadata(PATH, path, target);

  if (!Reflect.hasMetadata(ROUTES, target)) {
    Reflect.defineMetadata(ROUTES, [], target);
  }

  defineMiddleware(target, null, middleware);
};
