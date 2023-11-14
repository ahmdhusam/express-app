import { CatchError } from "./catchError.decorator";
import { BadRequestException } from "./exceptions/badRequest.exception";
import { IValidate } from "./validate.interface";

export const validateMiddleware = (validator: IValidate) =>
  CatchError((req, res, next) => {
    const result = validator.validate(req.body, { stripUnknown: true });
    if (result.error) {
      throw new BadRequestException(result.error.message);
    }
    req.body = result.value;
    next();
  });
