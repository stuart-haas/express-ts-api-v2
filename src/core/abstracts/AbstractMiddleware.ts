import { Request } from 'core';
import { NextFunction, Response } from 'express';

export abstract class AbstractMiddleware {
  abstract use(req: Request, res: Response, next: NextFunction): void;
}
