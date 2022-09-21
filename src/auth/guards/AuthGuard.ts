import passport from 'passport';
import { AbstractAuthGuard, Request } from 'core';
import { NextFunction, Response } from 'express';
import { AUTH } from 'core/constants';

export class AuthGuard extends AbstractAuthGuard {
  /* eslint-disable-next-line consistent-return */
  use(req: Request, res: Response, next: NextFunction) {
    const auth = Reflect.getMetadata(AUTH, req.metaData.controller) || Reflect.getMetadata(AUTH, req.metaData.controller, req.metaData.route.action);

    if (!auth) {
      return next();
    }

    passport.authenticate(auth, { session: false }, () => {
      super.isAuthenticated(req, next);
    })(req, res, next);
  }
}
