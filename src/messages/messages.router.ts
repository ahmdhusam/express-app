import { Router } from "express";
import { sendMessageValidator } from "./messages.validator";
import {
  getAllMessagesMiddleware,
  sendMessageMiddleware,
} from "./messages.middleware";
import { authorizationMiddleware } from "../auth/authorization.middleware";
import rateLimit from "express-rate-limit";

export const MessagesRouter = Router();

MessagesRouter.use(authorizationMiddleware);

MessagesRouter.route("/messages")
  .post(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 5,
      standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    }),
    sendMessageValidator,
    sendMessageMiddleware
  )
  .get(getAllMessagesMiddleware);
