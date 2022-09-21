import { ROLE } from 'core/constants';

export const AuthRole = (role: number | number[]): MethodDecorator & ClassDecorator => (target, propertyKey?: string, descriptor?: PropertyDescriptor) => {
  if (propertyKey) {
    Reflect.defineMetadata(ROLE, role, target.constructor, propertyKey);
    return descriptor;
  }
  Reflect.defineMetadata(ROLE, role, target);
  return target;
};
