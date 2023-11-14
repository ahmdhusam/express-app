import { Socket } from "socket.io";

const minute = 60 * 1000;
export const REQ_PER_MIN = 30;

export const rateLimiterWsMiddleware =
  (socket: Socket) => (_: any[], next: (err?: Error) => void) => {
    const limit = socket.data.limit;
    const now = Date.now();
    const diff = now - limit.lastTime;

    if (diff < minute) {
      if (limit.reqPerMin > 0) {
        limit.reqPerMin -= 1;
        return next();
      }

      next(new Error("Too many requests, please try again later."));
    } else {
      limit.lastTime = now;
      limit.reqPerMin = REQ_PER_MIN;
      next();
    }
  };
