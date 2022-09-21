import { HttpStatus } from 'core';
import { ClientError } from './ClientError';

export class ResourceAlreadyExistsError extends ClientError {
  constructor(details: string) {
    super('Resource already exists error', HttpStatus.RESOURCE_ALREADY_EXISTS);
    this.addDetails(details);
  }
}
