import passport from 'passport';
import { AbstractAuthGuard, Request } from 'core';
import { AUTH_JWT } from 'core/constants';
import { NextFunction, Response } from 'express';

export class JwtGuard extends AbstractAuthGuard {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(AUTH_JWT, { session: false }, () => {
      super.isAuthenticated(req, next);
    })(req, res, next);
  }
}
