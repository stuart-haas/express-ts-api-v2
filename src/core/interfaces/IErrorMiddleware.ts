import { NextFunction, Request, Response } from 'express';

export interface IErrorMiddleware {
  (error: Error, req: Request, res: Response, next: NextFunction): void;
}
