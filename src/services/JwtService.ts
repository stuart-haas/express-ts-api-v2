import { tokenBlacklistExpiration } from 'config/app';
import { Request } from 'core';
import { TOKENS_BLACKLIST } from 'core/constants';
import { redisClient } from 'dataSources/InMemoryDataSource';
import { AuthenticationError } from 'errors';
import { singleton } from 'tsyringe';

@singleton()
export class JwtService {
  getAuthBearer(req: Request) {
    return req.get('Authorization').replace('Bearer ', '');
  }

  async addToBlacklist(req: Request) {
    const token = this.getAuthBearer(req);
    await redisClient.setex(`${TOKENS_BLACKLIST}:${token}`, tokenBlacklistExpiration, true);
  }

  async getFromBlacklist(req: Request) {
    const token = this.getAuthBearer(req);
    const existingToken = await redisClient.get(`${TOKENS_BLACKLIST}:${token}`);
    if (existingToken) {
      throw new AuthenticationError('The token is invalid.');
    }
  }
}
