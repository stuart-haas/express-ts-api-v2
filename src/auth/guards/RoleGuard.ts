import { AbstractMiddleware, Request } from 'core';
import { ROLE } from 'core/constants';
import { AuthorizationError } from 'errors';
import { NextFunction, Response } from 'express';

export class RoleGuard extends AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const roles = Reflect.getMetadata(ROLE, req.metaData.controller) || Reflect.getMetadata(ROLE, req.metaData.controller, req.metaData.route.action);

    if (!roles) {
      return next();
    }

    const allow = typeof roles === 'number' ? req.user.roleId <= roles : roles.find((roleId: number) => req.user.roleId <= roleId);

    if (allow) {
      return next();
    }

    return next(
      new AuthorizationError('You are not allowed to access this resource.'),
    );
  }
}
