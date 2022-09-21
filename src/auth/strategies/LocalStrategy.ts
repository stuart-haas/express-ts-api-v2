import Strategy from 'passport-local';
import { AuthService } from 'modules/auth/AuthService';
import { injectable } from 'tsyringe';
import {
  AbstractAuthStrategy, IAuthStrategy, PassportCallback, Request,
} from 'core';
import { LocalStrategyArgs, LocalStrategyOptions } from './types';

@injectable()
export class LocalStrategy extends AbstractAuthStrategy<LocalStrategyOptions, LocalStrategyArgs> implements IAuthStrategy {
  constructor(private authService: AuthService) {
    super(Strategy, { passReqToCallback: true });
  }

  async handle(req: Request, username: string, password: string, done: PassportCallback): Promise<void> {
    try {
      const user = await this.authService.validate(req, username, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
