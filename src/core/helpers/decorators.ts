import {
  MIDDLEWARE, ROUTES, TRANSFORM, VALIDATORS,
} from 'core/constants';
import {
  AbstractMiddleware, AbstractTransformer, IMiddleware, Request, StatusCallback, MessageCallback, HttpStatus, IRoute,
} from 'core';
import { NextFunction, Response } from 'express';
import { wrap } from 'core/helpers';
import Joi from 'joi';

export const defineRoutes = (target: object, httpMethod: string, path: string | string[], action: string) => {
  if (!Reflect.hasMetadata(ROUTES, target)) {
    Reflect.defineMetadata(ROUTES, [], target);
  }

  const routes = Reflect.getMetadata(ROUTES, target) as IRoute[];

  if (typeof path === 'string') {
    routes.push({
      httpMethod,
      path,
      action,
    });
  } else {
    path.forEach((p: string) => {
      routes.push({
        httpMethod,
        path: p,
        action,
      });
    });
  }

  Reflect.defineMetadata(ROUTES, routes, target);
};

export const defineMiddleware = (target: object, propertyKey: string, middleware: IMiddleware | IMiddleware[] | AbstractMiddleware) => {
  if (!Reflect.hasMetadata(MIDDLEWARE, target, propertyKey)) {
    Reflect.defineMetadata(MIDDLEWARE, [], target, propertyKey);
  }

  if (middleware) {
    let middlewares = Reflect.getMetadata(MIDDLEWARE, target, propertyKey) as (AbstractMiddleware | IMiddleware)[];

    if (Array.isArray(middleware)) {
      middlewares = [...middleware];
    } else {
      middlewares.push(middleware);
    }

    Reflect.defineMetadata(MIDDLEWARE, middlewares, target, propertyKey);
  }
};

export const defineValidator = (target: object, propertyKey: string, validator: Joi.ObjectSchema) => {
  if (!Reflect.hasMetadata(VALIDATORS, target)) {
    Reflect.defineMetadata(VALIDATORS, {}, target);
  }

  const validators = Reflect.getMetadata(VALIDATORS, target);

  validators[propertyKey] = validator;

  Reflect.defineMetadata(VALIDATORS, validators, target);
};

export const beforeHandleTransform = (target: object, propertyKey: string) => (req: Request, res: Response, next: NextFunction) => {
  if (Reflect.hasMetadata(TRANSFORM, target.constructor, propertyKey)) {
    const transformer = Reflect.getMetadata(TRANSFORM, target.constructor, propertyKey) as AbstractTransformer;
    transformer.beforeHandle(req, res, next);
  }
};

export const handleTransform = <T>(target: object, propertyKey: string) => (data: T) => (req: Request, res: Response, next: NextFunction) => {
  if (Reflect.hasMetadata(TRANSFORM, target.constructor, propertyKey)) {
    const transformer = Reflect.getMetadata(TRANSFORM, target.constructor, propertyKey) as AbstractTransformer;
    return transformer.handle(data, req, res, next);
  }
  return wrap(data);
};

export const handleResponse = <T>(target: object, propertyKey: string) => (data: T, message: string | MessageCallback<T>, status: HttpStatus | StatusCallback<T>) => (req: Request, res: Response, next: NextFunction) => {
  const responseStatus = typeof status === 'function' ? status(data) : status;
  const responseMessage = typeof message === 'function' ? message(data) : message;

  res.status(responseStatus);
  if (message) {
    return res.json({ ...wrap(data), message: responseMessage });
  }
  if (typeof data === 'string') {
    return res.send(data);
  }
  return res.json(handleTransform(target, propertyKey)(data)(req, res, next));
};

export const getValidationType = (target: object, propertyKey: string, callback: (type: string) => void) => {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  const typeName = type.name.toLowerCase();
  if (Joi[typeName]) {
    callback(typeName);
  }
};
