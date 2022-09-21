import { Request } from 'core';
import { Response, NextFunction } from 'express';

export abstract class AbstractTransformer<T = unknown> {
  abstract beforeHandle(req: Request, res: Response, next: NextFunction): void;

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  abstract handle(context: T, req?: Request, res?: Response, next?: NextFunction): void;
}
