import { Joi } from 'express-validation';
import { createSchemaObject } from './validations';

export const createVideoBodyValidation = createSchemaObject({
  title: Joi.string().min(1).max(60).required(),
});
