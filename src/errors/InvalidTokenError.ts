import { HttpStatus } from 'core';
import { ClientError } from './ClientError';

export class InvalidTokenError extends ClientError {
  constructor(details: string) {
    super('Invalid token error', HttpStatus.UNAUTHORIZED);
    this.addDetails(details);
  }
}
