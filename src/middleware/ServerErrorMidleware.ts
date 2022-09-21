import { AbstractErrorMiddleware, Request, HttpStatus } from 'core';
import { injectable } from 'tsyringe';
import { LoggerService } from 'services';
import { NextFunction, Response } from 'express';

@injectable()
export class ServerErrorMidleware extends AbstractErrorMiddleware {
  constructor(private loggerService: LoggerService) {
    super();
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  use(err: Error, req: Request, res: Response, next: NextFunction) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status);

    this.loggerService.client.error({ error: err, stack: this.stackUtils.clean(err.stack) });

    return this.handleError(err, req, res);
  }
}
