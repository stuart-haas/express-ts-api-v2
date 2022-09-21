import { STATUS } from 'core/constants';
import { HttpStatus, StatusCallback } from 'core';

export const Status = <T = unknown>(status: HttpStatus | StatusCallback<T>): MethodDecorator => (target, propertyKey: string, descriptor: PropertyDescriptor): void => {
  Reflect.defineMetadata(STATUS, status, descriptor.value);
};
