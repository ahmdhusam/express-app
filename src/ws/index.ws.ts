import { Server } from "socket.io";
import { roomsHandler } from "./rooms/rooms.handler";
import { messagesHandler } from "./messages/messages.handler";
import { imagesHandler } from "./images/images.handler";
import { authorizationWsMiddleware } from "./authorization.middlewar";
import { rateLimiterWsMiddleware } from "./rateLimiter.middleware";

export const useWs = (io: Server) => {
  // Authorization middleware
  io.use(authorizationWsMiddleware);

  io.on("connection", (socket) => {
    socket.use(rateLimiterWsMiddleware(socket));

    roomsHandler(io, socket);
    messagesHandler(io, socket);
    imagesHandler(io, socket);

    socket.on("error", (err) => {
      socket.emit("error", err.message);
    });

    socket.on("disconnect", () => {
      for (let roomName of socket.rooms) {
        if (roomName === socket.id) continue;
        socket.broadcast
          .to(roomName)
          .emit("room:leave", socket.data.user.username);
      }
    });
  });
};
