import { ClientError } from './ClientError';

export class PasswordHashError extends ClientError {
  constructor(message: string, details: string) {
    super(message || 'Password hash error');
    this.addDetails(details);
  }
}
