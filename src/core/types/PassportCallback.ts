import User from 'models/User';

export type PassportCallback = {
  (error: Error | string | undefined, successData: number | User | boolean): void
}
