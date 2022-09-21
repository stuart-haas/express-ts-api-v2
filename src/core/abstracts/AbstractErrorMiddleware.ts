import { isDev } from 'config/app';
import { Request } from 'core';
import { ClientError } from 'errors';
import { NextFunction, Response } from 'express';
import StackUtils from 'stack-utils';

export abstract class AbstractErrorMiddleware {
  stackUtils: StackUtils;

  constructor() {
    this.stackUtils = new StackUtils({
      cwd: process.cwd(),
      internals: StackUtils.nodeInternals(),
    });
  }

  abstract use(error: Error, req: Request, res: Response, next: NextFunction): void;

  protected handleError(error: Error, req: Request, res: Response) {
    if (error instanceof ClientError) {
      error.instance = req.path;
      if (isDev) {
        error.stack = this.stackUtils.clean(error.stack);
      }
    }
    return res.json(error);
  }
}
