import passport from 'passport';
import { AbstractAuthGuard, Request } from 'core';
import { NextFunction, Response } from 'express';
import { AUTH_LOCAL } from 'core/constants';

export class LocalGuard extends AbstractAuthGuard {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(AUTH_LOCAL, { session: true }, () => {
      super.isAuthenticated(req, next);
    })(req, res, next);
  }
}
