import { HttpStatus } from 'core';
import { ClientError } from './ClientError';
import { SequelizeForeignKeyConstraintError } from './types';

export class ForeignKeyConstraintError extends ClientError {
  constructor(error: SequelizeForeignKeyConstraintError) {
    super(error.original.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    this.addDetails(error.message);
  }
}
