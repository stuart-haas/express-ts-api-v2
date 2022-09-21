import { Request } from 'core';
import { AuthenticationError } from 'errors';
import { NextFunction } from 'express';
import { AbstractMiddleware } from './AbstractMiddleware';

export abstract class AbstractAuthGuard extends AbstractMiddleware {
  isAuthenticated(req: Request, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    return next(
      new AuthenticationError('You are not allowed to access this resource.'),
    );
  }
}
