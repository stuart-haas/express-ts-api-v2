import { VALIDATORS } from 'core/constants';
import Joi from 'joi';

export abstract class AbstractDto {
  getSchema() {
    const validators = Reflect.getMetadata(VALIDATORS, this);
    return Joi.object().keys(validators);
  }
}
