import { Response } from 'express';
import {
  Controller, Post, IController, Middleware, Request, Message, Validate, RequestUser,
} from 'core';
import { injectable } from 'tsyringe';
import passport from 'passport';
import { JwtGuard, LocalGuard } from 'auth';
import { AUTH_LOCAL } from 'core/constants';
import { AuthService } from './AuthService';
import {
  loginSchema, registerSchema,
} from './validation';

@injectable()
@Controller()
export default class AuthController implements IController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @Validate(loginSchema)
  @Middleware(passport.authenticate(AUTH_LOCAL, { session: true }))
  @Message<RequestUser>((data) => 'You are now logged in')
  async login(req: Request) {
    return await this.authService.login(req);
  }

  @Post('login/jwt')
  @Validate(loginSchema)
  @Middleware(passport.authenticate(AUTH_LOCAL, { session: false }))
  @Message<RequestUser>((data) => 'You are now logged in')
  async loginJwt(req: Request) {
    return await this.authService.loginJwt(req);
  }

  @Post('logout')
  @Middleware(LocalGuard)
  @Message(() => 'You have been logged out.')
  async logout(req: Request, res: Response) {
    await this.authService.logout(req);
    res.clearCookie('connect.sid');
  }

  @Post('logout/jwt')
  @Middleware(JwtGuard)
  @Message(() => 'You have been logged out.')
  async logoutJwt(req: Request) {
    await this.authService.logoutJwt(req);
  }

  @Post('force-logout')
  @Message(() => 'You have been logged out.')
  async forceLogout(req: Request, res: Response) {
    await this.authService.logout(req);
    res.clearCookie('connect.sid');
  }

  @Post('register')
  @Validate(registerSchema)
  @Message(() => 'Your account has been activated.')
  async register(req: Request) {
    return await this.authService.register(req);
  }

  @Post('session')
  @Middleware(LocalGuard)
  session(req: Request) {
    return req.user;
  }
}
