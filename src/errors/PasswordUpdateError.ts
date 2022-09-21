import { ClientError } from './ClientError';

export class PasswordUpdateError extends ClientError {
  constructor(details: string) {
    super('Password update error');
    this.addDetails(details);
  }
}
