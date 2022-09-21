import { AUTH_SCOPE } from 'core/constants';

export const AuthScope = (scope: string): MethodDecorator & ClassDecorator => (target, propertyKey?: string, descriptor?: PropertyDescriptor) => {
  if (propertyKey) {
    Reflect.defineMetadata(AUTH_SCOPE, scope, target.constructor, propertyKey);
    return descriptor;
  }
  Reflect.defineMetadata(AUTH_SCOPE, scope, target);
  return target;
};
