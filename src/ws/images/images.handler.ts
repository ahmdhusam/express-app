import { Server, Socket } from "socket.io";
import { sendImageWsValidator } from "./images.validators";
import { ImgaeOpt } from "./imageOpt.enum";

export const imagesHandler = (io: Server, socket: Socket) => {
  socket.use(sendImageWsValidator(ImgaeOpt.Send));
  socket.on(ImgaeOpt.Send, async ({ roomName, image }, cb) => {
    if (!socket.rooms.has(roomName)) return cb("You are not member");

    socket.broadcast.to(roomName).emit("image:sent", { image });
    cb(null, "The image sent successfully");
  });
};
