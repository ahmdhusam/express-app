import Express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApplicationError } from "./utiles/exceptions/application.error";
import { UsersRouter } from "./users/users.router";
import { UserModel } from "./users/users.model";
import * as dotenv from "dotenv";
import { AuthRouter } from "./auth/auth.router";
import { MessagesRouter } from "./messages/messages.router";
import { rateLimit } from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import { useWs } from "./ws/index.ws";

declare global {
  namespace Express {
    interface Request {
      user: InstanceType<typeof UserModel> | null;
    }
  }
}

dotenv.config();

const app = Express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    skipMiddlewares: false,
  },
  maxHttpBufferSize: 3e6, // 3MB
});

app.disable("x-powered-by");

app.use(Express.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  })
);

app.use("/api", UsersRouter, AuthRouter, MessagesRouter);

// Error handler
app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    const { message, error = "Internal Server Error", statusCode = 500 } = err;

    res.status(statusCode).send({
      message: message,
      error: error,
      statusCode: statusCode,
    });
  }
);

async function bootstrap() {
  await mongoose.connect(process.env.DATABASE_URL ?? "");

  useWs(io);

  server.listen(3000, () => {
    console.log("listen on", 3000);
  });
}

bootstrap();
