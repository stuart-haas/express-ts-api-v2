import { StrategyOptions } from 'core';
import passport, { Strategy as PassportStrategy } from 'passport';

export abstract class AbstractAuthStrategy<Options extends string | StrategyOptions, Args extends unknown[]> {
  abstract handle(...args: Args): Promise<void>;

  constructor(Strategy: PassportStrategy, options: string | Options) {
    if (typeof options === 'string') {
      passport.use(options, new Strategy((...args: Args) => this.handle(...args)));
    } else {
      passport.use(new Strategy(options, (...args: Args) => this.handle(...args)));
    }
  }
}
