import { validationOptions } from 'config/app';
import { AbstractMiddleware, Request } from 'core';
import { VALIDATE } from 'core/constants';
import { RequestValidationError } from 'errors';
import { NextFunction, Response } from 'express';

export class ValidateMiddleware implements AbstractMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const validate = Reflect.getMetadata(VALIDATE, req.metaData.controller, req.metaData.route.action);

    if (!validate) {
      return next();
    }

    const { schema, property } = validate;

    const { error } = schema.validate(req[property], validationOptions);
    if (error) {
      return next(new RequestValidationError(error));
    }
    return next();
  }
}
