import { AbstractMiddleware, Request } from 'core';
import { AuthorizationError } from 'errors';
import { NextFunction, Response } from 'express';

export class UserGuard extends AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user.id !== +req.params.id) {
      return next();
    }
    return next(
      new AuthorizationError('You are not allowed to access this resource.'),
    );
  }
}
