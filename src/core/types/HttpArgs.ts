import { Response, NextFunction } from 'express';
import { Request } from 'core';

export type HttpArgs = [
  req: Request,
  res: Response,
  next: NextFunction
];
