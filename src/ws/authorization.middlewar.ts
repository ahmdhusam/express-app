import { Socket } from "socket.io";
import { isValidToken } from "../auth/isValidToken.utiles";
import { IPayload } from "../auth/payload.interface";
import { UserModel } from "../users/users.model";
import { REQ_PER_MIN } from "./rateLimiter.middleware";

export const authorizationWsMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const token =
    socket.handshake.auth?.token?.split(" ")[1] ??
    socket.handshake.headers?.authorization?.split(" ")[1];
  if (!token) return next(new Error("Authorization Token is required"));

  const payload: IPayload = {};
  if (!isValidToken(token, payload)) return next(new Error("invalid token"));

  const user = await UserModel.findById(payload.sub);
  if (!user) return next(new Error("invalid token"));

  socket.data.user = user;
  socket.data.limit = {
    lastTime: Date.now(),
    reqPerMin: REQ_PER_MIN,
  };
  next();
};
