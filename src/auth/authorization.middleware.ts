import { NextFunction, Request, Response } from "express";
import { CatchError } from "../utiles/catchError.decorator";
import { IPayload } from "./payload.interface";
import { UnauthorizedException } from "../utiles/exceptions/unauthorized.exception";
import { UserModel } from "../users/users.model";
import { isValidToken } from "./isValidToken.utiles";

export const authorizationMiddleware = CatchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("authorization")?.split(" ")[1];

    if (!token) throw new UnauthorizedException();

    const payload: IPayload = {};
    if (!isValidToken(token, payload))
      throw new UnauthorizedException("invalid token");

    const user = await UserModel.findById(payload.sub);
    if (!user) throw new UnauthorizedException("invalid token");

    req.user = user;
    next();
  }
);
