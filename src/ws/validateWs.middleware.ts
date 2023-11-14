import { IValidate } from "../utiles/validate.interface";

export function validateWsMiddleware(validator: IValidate) {
  return function (optName: string) {
    return (body: any[], next: (err?: Error) => void) => {
      if (body[0] !== optName) return next();

      const result = validator.validate(body[1], { stripUnknown: true });
      if (result.error) {
        return next(new Error(result.error.message));
      }

      if (typeof body[2] !== "function") {
        // TODO:
        return next(new Error("call back function is required"));
      }

      next();
    };
  };
}
