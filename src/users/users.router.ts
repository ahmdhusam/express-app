import { Router } from "express";
import { registerUserValidator } from "./users.validator";
import {
  getAllUsersMiddleware,
  registerUserMiddleware,
} from "./users.middleware";
import { authorizationMiddleware } from "../auth/authorization.middleware";

export const UsersRouter = Router();

UsersRouter.route("/users")
  .post(registerUserValidator, registerUserMiddleware)
  .get(authorizationMiddleware, getAllUsersMiddleware);
