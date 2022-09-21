import { HttpStatus } from 'core';
import { ClientError } from './ClientError';

export class ResourceNotFoundError extends ClientError {
  constructor(details: string) {
    super('Resource not found error', HttpStatus.RESOURCE_NOT_FOUND);
    this.addDetails(details);
  }
}
