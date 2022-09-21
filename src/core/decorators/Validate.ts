import { AbstractDto } from 'core';
import { VALIDATE } from 'core/constants';
import { ObjectSchema } from 'joi';
import { container, InjectionToken } from 'tsyringe';

export const Validate = (validator: ObjectSchema | InjectionToken<AbstractDto>, property = 'body'): MethodDecorator => (target, propertyKey: string): void => {
  try {
    const dtoInstance = container.resolve(validator as InjectionToken<AbstractDto>);
    const schema = dtoInstance.getSchema();
    Reflect.defineMetadata(VALIDATE, { schema, property }, target.constructor, propertyKey);
  } catch (err) {
    Reflect.defineMetadata(VALIDATE, { schema: validator, property }, target.constructor, propertyKey);
  }
};
