import { TRANSFORM } from 'core/constants';
import { AbstractTransformer } from 'core/abstracts/AbstractTransformer';
import { container, InjectionToken } from 'tsyringe';

export const Transform = (transformer: InjectionToken<AbstractTransformer>): MethodDecorator => (target, propertyKey: string): void => {
  const transformerInstance = container.resolve(transformer);
  Reflect.defineMetadata(TRANSFORM, transformerInstance, target.constructor, propertyKey);
};
