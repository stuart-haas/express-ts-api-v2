import { ORDER } from 'core/constants';

export const Order = (order: string[]): MethodDecorator & ClassDecorator => (target, propertyKey?: string, descriptor?: PropertyDescriptor) => {
  if (propertyKey) {
    Reflect.defineMetadata(ORDER, order, target.constructor, propertyKey);
    return descriptor;
  }
  Reflect.defineMetadata(ORDER, order, target);
  return target;
};
