import { Request, PassportCallback } from 'core';

export type LocalStrategyArgs = [
  req: Request, username: string, password: string, done: PassportCallback
]
