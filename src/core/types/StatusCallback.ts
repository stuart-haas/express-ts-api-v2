import { HttpStatus } from 'core';

export type StatusCallback<T> = {
  (data?: T): HttpStatus
}
