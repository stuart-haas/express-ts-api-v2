import { AbstractErrorMiddleware, IErrorMiddleware } from 'core';
import { InjectionToken } from 'tsyringe';
import { IMiddleware } from './IMiddleware';
import { IProvider } from './IProvider';

export interface IErrorProvider extends IProvider {
  handlers: (IErrorMiddleware | IMiddleware | InjectionToken<AbstractErrorMiddleware>)[]
}
