import Joi from "joi";
import { validateMiddleware } from "../utiles/validate.middleware";

export const registerUserValidator = validateMiddleware(
  Joi.object({
    username: Joi.string().required().min(5).max(20),
    password: Joi.string().min(5).max(20).required(),
  })
);
