import { HttpStatus } from 'core';
import { ValidationError } from 'joi';
import { ClientError } from './ClientError';

export class RequestValidationError extends ClientError {
  constructor(error: ValidationError) {
    super(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    this.details = error.details;
  }
}
