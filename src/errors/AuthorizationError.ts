import { HttpStatus } from 'core';
import { ClientError } from './ClientError';

export class AuthorizationError extends ClientError {
  constructor(details: string) {
    super('Authorization error', HttpStatus.FORBIDDEN);
    this.addDetails(details);
  }
}
