import Joi from "joi";
import { validateMiddleware } from "../utiles/validate.middleware";

export const MESSAGE_MAX_LENGTH = 255;

export const sendMessageValidator = validateMiddleware(
  Joi.object({
    content: Joi.string().max(MESSAGE_MAX_LENGTH).required(),
    roomName: Joi.string().required().min(3).max(10),
  })
);
