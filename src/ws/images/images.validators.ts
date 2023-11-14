import Joi from "joi";
import { validateWsMiddleware } from "../validateWs.middleware";

export const sendImageWsValidator = validateWsMiddleware(
  Joi.object({
    roomName: Joi.string().required().min(3).max(10),
    image: Joi.binary(),
  })
);
