import { Joi } from 'express-validation';
import { filterProperties } from '../helpers/objetc.helpers';
import { httpStatusCodes, httpErrorCodes, throwHttpError } from '../helpers/errors.helpers';

export function createSchemaObject(schema) {
  return Joi.object(schema).unknown();
}

export function validateInputs(validation, object) {
  const { value, error } = validation.validate(object);
  if (error) throwHttpError(httpStatusCodes.BAD_REQUEST, httpErrorCodes.INVALID_INPUT_DATA);
  return filterProperties(validation, value);
}

// general validations

export const idParamValidation = createSchemaObject({
  id: getIdValidation(),
});

export function getIdValidation() {
  return Joi.number().integer().min(1);
}
