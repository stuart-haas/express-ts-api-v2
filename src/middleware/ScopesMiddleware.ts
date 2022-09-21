import { AbstractMiddleware, Request } from 'core';
import { NextFunction, Response } from 'express';
import { ScopeOptions } from 'sequelize/types';

export class ScopesMiddleware extends AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { scope } = req.query;
    const scopes: (string | ScopeOptions)[] = scope ? Object.keys(scope).map((key) => ({ method: [key, scope[key]] })) : ['defaultScope'];
    req.scopes = scopes;
    next();
  }
}
