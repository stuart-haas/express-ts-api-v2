export type JwtStrategyOptions = {
  secretOrKey: string;
  jwtFromRequest: () => string;
  passReqToCallback: boolean;
}
