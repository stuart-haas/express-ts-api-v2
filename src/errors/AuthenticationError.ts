import { HttpStatus } from 'core';
import { ClientError } from './ClientError';

export class AuthenticationError extends ClientError {
  constructor(details: string) {
    super('Authentication error', HttpStatus.UNAUTHORIZED);
    this.addDetails(details);
  }
}
