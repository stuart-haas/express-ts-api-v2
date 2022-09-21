import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import User from 'models/User';
import {
  AuthenticationError, PasswordHashError,
} from 'errors';
import { injectable } from 'tsyringe';
import Role from 'models/Role';
import { Request } from 'core';
import jwt from 'jsonwebtoken';
import {
  jwtSecret, loginTokenExpiration,
} from 'config/app';
import { JwtService } from 'services';

@injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(req: Request) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { password, ...user } = req.user;
    return {
      user,
    };
  }

  async loginJwt(req: Request) {
    const { user } = await this.login(req);
    const token = jwt.sign(user, jwtSecret, { expiresIn: loginTokenExpiration });

    return {
      ...user,
      token,
    };
  }

  async logout(req: Request) {
    req.logout();
  }

  async logoutJwt(req: Request) {
    await this.jwtService.addToBlacklist(req);
  }

  async register(req: Request) {
    const { body } = req;
    const { password } = body;

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { token, ...cleanPayload } = body;
    const hashedPassword = await this.hashPassword(password);
    return await User.create({ ...cleanPayload, password: hashedPassword, roleId: 1 });
  }

  async validate(req: Request, username: string, password: string) {
    const user = await User.findOne({
      where: { [Op.or]: [{ email: username }, { username }] },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });
    if (user) {
      if (!user.active) {
        throw new AuthenticationError('The user is no longer active.');
      }
      if (await bcrypt.compare(password, user.password)) {
        return user.toJSON();
      }
      throw new AuthenticationError('The username or password is incorrect.');
    }
    throw new AuthenticationError('The username or password is incorrect.');
  }

  private async hashPassword(password: string, salt = 10) {
    return await bcrypt.hash(password, salt).catch((err: Error) => {
      const error = new PasswordHashError(err.message, 'Sorry, we were unable to update your password.');
      throw error;
    });
  }
}
