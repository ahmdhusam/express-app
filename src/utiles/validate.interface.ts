import { ValidationOptions, ValidationResult } from "joi";

export interface IValidate {
  validate(value: any, options?: ValidationOptions): ValidationResult<any>;
}
