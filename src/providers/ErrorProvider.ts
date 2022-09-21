import {
  AbstractErrorMiddleware, IErrorMiddleware, IErrorProvider, HttpProvider,
} from 'core';
import { ErrorRequestHandler } from 'express';
import { ClientErrorMiddleware, ServerErrorMidleware } from 'middleware';
import { Application } from 'start';
import {
  delay, inject, InjectionToken, singleton,
} from 'tsyringe';

@singleton()
export class ErrorProvider extends HttpProvider implements IErrorProvider {
  constructor(@inject(delay(() => Application)) private application: Application) {
    super();
  }

  handlers: (IErrorMiddleware | InjectionToken<AbstractErrorMiddleware>)[] = [
    ClientErrorMiddleware,
    ServerErrorMidleware,
  ];

  register(): void {
    const handlers = this.resolveErrorMiddelware(this.handlers) as ErrorRequestHandler[];
    this.application.server.use(handlers);
  }
}
