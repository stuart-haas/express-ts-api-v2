import { AbstractMiddleware } from 'core';
import { InjectionToken } from 'tsyringe';
import { IController } from './IController';
import { IMiddleware } from './IMiddleware';
import { IProvider } from './IProvider';

export interface IRouteProvider extends IProvider {
  basePath: string;
  controllers: InjectionToken<IController>[];
  middleware: (IMiddleware | InjectionToken<AbstractMiddleware>)[]
}
