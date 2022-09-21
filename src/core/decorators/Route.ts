import {
  IMiddleware, HttpStatus, HttpArgs, defineMiddleware, beforeHandleTransform, handleResponse, defineRoutes,
} from 'core';
import {
  DELETE, GET, STATUS, PATCH, POST, PUT, MESSAGE,
} from 'core/constants';
// import { defineBody } from './Body';
// import { defineParam } from './Param';
// import { defineQuery } from './Query';

export const Route = (httpMethod: string, httpStatus: number) => (path: string | string[] = '', middleware?: IMiddleware | IMiddleware[], responder = true): MethodDecorator => (target, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor | void => {
  const status = Reflect.getMetadata(STATUS, descriptor.value) || httpStatus;
  const message = Reflect.getMetadata(MESSAGE, descriptor.value) || null;

  defineRoutes(target.constructor, httpMethod, path, propertyKey);

  defineMiddleware(target.constructor, propertyKey, middleware);

  if (!responder) {
    return descriptor;
  }

  const method = descriptor.value;

  descriptor.value = async function (...args: HttpArgs) {
    const req = args[0];
    const res = args[1];
    const next = args[2];

    const methodArgs = [...args];

    // defineParam(target, propertyKey, req, methodArgs);

    // defineBody(target, propertyKey, req, methodArgs);

    // defineQuery(target, propertyKey, req, methodArgs);

    try {
      beforeHandleTransform(target, propertyKey)(req, res, next);
      const data = await method.apply(this, methodArgs);
      return handleResponse(target, propertyKey)(data, message, status)(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

  return descriptor;
};

export const Get = Route(GET, HttpStatus.OK);

export const Post = Route(POST, HttpStatus.CREATED);

export const Put = Route(PUT, HttpStatus.OK);

export const Patch = Route(PATCH, HttpStatus.OK);

export const Delete = Route(DELETE, HttpStatus.OK);
