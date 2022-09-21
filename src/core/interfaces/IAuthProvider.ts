import { IAuthStrategy, IProvider } from 'core';
import { InjectionToken } from 'tsyringe';

export interface IAuthProvider extends IProvider {
  strategies: InjectionToken<IAuthStrategy>[];
}
