import { AbstractMiddleware } from 'core';
import { InjectionToken } from 'tsyringe';
import { IMiddleware } from './IMiddleware';
import { IProvider } from './IProvider';

export interface IMiddlewareProvider extends IProvider {
  middleware: (IMiddleware | InjectionToken<AbstractMiddleware>)[]
}
