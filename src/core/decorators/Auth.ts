import { AUTH } from 'core/constants';

export const Auth = (auth: string | string[]): MethodDecorator & ClassDecorator => (target, propertyKey?: string, descriptor?: PropertyDescriptor) => {
  if (propertyKey) {
    Reflect.defineMetadata(AUTH, auth, target.constructor, propertyKey);
    return descriptor;
  }
  Reflect.defineMetadata(AUTH, auth, target);
  return target;
};
