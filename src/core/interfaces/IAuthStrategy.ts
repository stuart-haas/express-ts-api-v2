export interface IAuthStrategy {
  handle(...args: unknown[]): Promise<void>;
}
