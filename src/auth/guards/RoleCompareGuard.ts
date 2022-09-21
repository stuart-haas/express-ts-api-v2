import { AbstractMiddleware, Request } from 'core';
import { AuthorizationError } from 'errors';
import { NextFunction, Response } from 'express';
import { UserService } from 'modules/users/UserService';
import { injectable } from 'tsyringe';

@injectable()
export class RoleCompareGuard extends AbstractMiddleware {
  constructor(private userService: UserService) {
    super();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.findById(+req.params.id);
    if (req.user.roleId <= user.roleId) {
      return next();
    }
    return next(
      new AuthorizationError('You are not allowed to access this resource.'),
    );
  }
}
