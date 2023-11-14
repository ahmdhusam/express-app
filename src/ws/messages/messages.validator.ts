import Joi from "joi";
import { validateWsMiddleware } from "../validateWs.middleware";
import { MESSAGE_MAX_LENGTH } from "../../messages/messages.validator";

export const sendMessageWsValidator = validateWsMiddleware(
  Joi.object({
    roomName: Joi.string().required().min(3).max(10),
    message: Joi.string().max(MESSAGE_MAX_LENGTH).required(),
  })
);

export const messagePageWsValidator = validateWsMiddleware(
  Joi.object({
    roomName: Joi.string().required().min(3).max(10),
    pageNum: Joi.number().required().integer().min(0),
  })
);
