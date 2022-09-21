import { HttpStatus } from 'core';
import Sequelize from 'sequelize';
import { ClientError } from './ClientError';

export class DatabaseValidationError extends ClientError {
  constructor(error: Sequelize.ValidationError) {
    super(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    this.details = error.errors;
  }
}
