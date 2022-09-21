import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
import Sequelize from 'sequelize';
import {
  ClientError, DatabaseValidationError, InvalidTokenError, ForeignKeyConstraintError, ResourceNotFoundError,
} from 'errors';
import { AbstractErrorMiddleware, HttpStatus, Request } from 'core';
import { NextFunction, Response } from 'express';
import { SequelizeForeignKeyConstraintError } from 'errors/types';

export class ClientErrorMiddleware extends AbstractErrorMiddleware {
  use(err: Error, req: Request, res: Response, next: NextFunction) {
    const status = err instanceof ClientError ? err.status : HttpStatus.BAD_REQUEST;
    res.status(status);
    if (err instanceof Sequelize.ValidationError) {
      const error = new DatabaseValidationError(err);
      return this.handleError(error, req, res);
    }
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      const error = new ForeignKeyConstraintError(err as SequelizeForeignKeyConstraintError);
      return this.handleError(error, req, res);
    }
    if (err instanceof Sequelize.EmptyResultError) {
      const error = new ResourceNotFoundError('The resource could not be found.');
      return this.handleError(error, req, res);
    }
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
      const error = new InvalidTokenError('The token is invalid.');
      return this.handleError(error, req, res);
    }
    if (err instanceof ClientError) {
      return this.handleError(err, req, res);
    }
    return next(err);
  }
}
