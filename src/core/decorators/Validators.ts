import { defineValidator, getValidationType } from 'core/helpers';
import Joi from 'joi';

export const Required = (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().required());
  });
};

export const Integer = (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().integer().required());
  });
};

export const Optional = (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().optional());
  });
};

export const Valid = (valid: (string | number | boolean)[]) => (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().valid(...valid));
  });
};

export const IPV4 = (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().ip({ version: ['ipv4'] }));
  });
};

export const MacAddress = (target: object, propertyKey: string): void => {
  getValidationType(target, propertyKey, (type: string) => {
    defineValidator(target, propertyKey, Joi[type]().custom((value, helper) => {
      const regex = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$';
      if (!value.match(regex)) {
        return helper.message(`${propertyKey} must be a valid mac address`);
      }
      return value;
    }).required());
  });
};
