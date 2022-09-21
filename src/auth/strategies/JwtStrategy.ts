import { Strategy, ExtractJwt } from 'passport-jwt';
import { injectable } from 'tsyringe';
import {
  AbstractAuthStrategy, IAuthStrategy, PassportCallback, Request, RequestUser,
} from 'core';
import { jwtSecret } from 'config/app';
import { JwtService } from 'services';
import { UserService } from 'modules/users/UserService';
import { JwtStrategyArgs, JwtStrategyOptions } from './types';

@injectable()
export class JwtStrategy extends AbstractAuthStrategy<JwtStrategyOptions, JwtStrategyArgs> implements IAuthStrategy {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super(Strategy, {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async handle(req: Request, payload: RequestUser, done: PassportCallback): Promise<void> {
    try {
      await this.jwtService.getFromBlacklist(req);
      const user = await this.userService.findById(payload.id);
      req.user = payload;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
