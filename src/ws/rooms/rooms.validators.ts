import Joi from "joi";
import { validateWsMiddleware } from "../validateWs.middleware";

export const roomNameWsValidator = validateWsMiddleware(
  Joi.object({
    roomName: Joi.string().required().min(3).max(10),
  })
);
