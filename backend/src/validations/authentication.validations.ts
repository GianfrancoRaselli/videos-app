import { Joi } from 'express-validation';
import { createSchemaObject } from './validations';

export const authenticationBodyValidation = createSchemaObject({
  username: Joi.string().min(6).max(100).required(),
  password: Joi.string().min(8).max(255).required(),
});
