import { IAuthStrategy, IAuthProvider } from 'core';
import { container, InjectionToken, singleton } from 'tsyringe';
import {
  JwtStrategy, LocalStrategy, AuthSerializer,
} from 'auth';

@singleton()
export class AuthProvider implements IAuthProvider {
  constructor(
    private authSerializer: AuthSerializer,
  ) {}

  strategies: InjectionToken<IAuthStrategy>[] = [
    LocalStrategy,
    JwtStrategy,
  ];

  register(): void {
    this.authSerializer.serialize();
    this.authSerializer.deserialize();

    this.strategies.forEach((strategy: InjectionToken<IAuthStrategy>) => {
      container.resolve(strategy);
    });
  }
}
