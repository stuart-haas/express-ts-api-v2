import passport from 'passport';
import User from 'models/User';
import { PassportCallback } from 'core';
import { UserService } from 'modules/users/UserService';
import { injectable } from 'tsyringe';

@injectable()
export class AuthSerializer {
  constructor(private userService: UserService) {}

  serialize() {
    passport.serializeUser((user: User, done: PassportCallback) => {
      done(null, user.id);
    });
  }

  deserialize() {
    passport.deserializeUser((id: string, done: PassportCallback) => {
      this.userService.findById(+id).then((user) => {
        done(null, user);
      });
    });
  }
}
