import { IController, IRoute } from 'core';
import { InjectionToken } from 'tsyringe';

export type RequestMetaData = {
  controller: InjectionToken<IController>;
  route: IRoute;
}
