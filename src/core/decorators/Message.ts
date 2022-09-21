import { MESSAGE } from 'core/constants';
import { MessageCallback } from 'core/types';

export const Message = <T = unknown>(message: string | MessageCallback<T>): MethodDecorator => (target, propertyKey: string, descriptor: PropertyDescriptor): void => {
  Reflect.defineMetadata(MESSAGE, message, descriptor.value);
};
