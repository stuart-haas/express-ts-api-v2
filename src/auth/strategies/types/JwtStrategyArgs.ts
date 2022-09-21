import { Request, PassportCallback, RequestUser } from 'core';

export type JwtStrategyArgs = [
  req: Request, payload: RequestUser, done: PassportCallback
]
