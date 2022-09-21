import { HttpStatus } from 'core';
import { ErrorDetails } from './types';

export class ClientError extends Error {
  status: number;

  details: ErrorDetails = [];

  instance: string;

  constructor(message: string, status = HttpStatus.BAD_REQUEST) {
    super(message);
    this.status = status;
  }

  protected addDetails(message: string) {
    this.details.push({ message });
  }
}
