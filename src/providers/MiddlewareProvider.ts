import express, { RequestHandler } from 'express';
import { inject, singleton, delay } from 'tsyringe';
import {
  headerMiddleware, HttpProvider, IApplication, IMiddleware, IMiddlewareProvider, Request,
} from 'core';
import { Application } from 'start';
import session from 'express-session';
import SequelizeSessionInit from 'connect-session-sequelize';
import { databaseClient } from 'dataSources/SqlDataSource';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import { sessionSecret } from 'config/app';
import { LoggerService } from 'services';

const SequelizeStore = SequelizeSessionInit(session.Store);

morgan.token('request-id', (req: Request) => req.id);

@singleton()
export class MiddlewareProvider extends HttpProvider implements IMiddlewareProvider {
  constructor(
    @inject(delay(() => Application)) private application: IApplication,
    private loggerService: LoggerService,
  ) {
    super();
  }

  middleware: IMiddleware[] = [
    headerMiddleware,
    express.json(),
    cors({
      credentials: true,
      origin: true,
    }),
    helmet(),
    session({
      secret: sessionSecret,
      store: new SequelizeStore({
        db: databaseClient,
        tableName: 'sessions',
      }),
      cookie: {
        httpOnly: true,
        secure: false,
      },
      resave: false,
      saveUninitialized: false,
    }),
    passport.initialize(),
    passport.session(),
    morgan(
      ':method :url :status :response-time ms - :res[content-length] :request-id',
      {
        stream: {
          write: (message: string) => this.loggerService.client.http(message),
        },
      },
    ),
  ]

  register(): void {
    const middleware = this.resolveMiddelware(this.middleware) as RequestHandler[];
    this.application.server.use(middleware);
  }
}
