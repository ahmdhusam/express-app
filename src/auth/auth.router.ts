import { Router } from "express";
import { registerUserValidator } from "../users/users.validator";
import { authenticateMiddleware } from "./authentication.middleware";

export const AuthRouter = Router();

AuthRouter.route("/auth").post(registerUserValidator, authenticateMiddleware);
