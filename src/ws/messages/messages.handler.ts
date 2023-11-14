import { Server, Socket } from "socket.io";
import { MessageModel } from "../../messages/messages.model";
import { RoomModel } from "../../rooms/rooms.model";
import {
  messagePageWsValidator,
  sendMessageWsValidator,
} from "./messages.validator";
import { MessageOpt } from "./messageOpt.enum";

export const messagesHandler = (io: Server, socket: Socket) => {
  socket.use(sendMessageWsValidator(MessageOpt.Send));
  socket.on(MessageOpt.Send, async ({ roomName, message }, cb) => {
    if (!socket.rooms.has(roomName)) return cb("You are not a member");

    const room = await RoomModel.findOne({ name: roomName });

    const newMessage = new MessageModel({
      sender: socket.data.user.id,
      content: message,
      room: room?.id,
    });

    await newMessage.save();
    socket.broadcast
      .to(roomName)
      .emit("message:sent", { user: socket.data.user.username, message });

    cb(null, "The message sent successfully");
  });

  socket.use(messagePageWsValidator(MessageOpt.Page));
  socket.on(MessageOpt.Page, async ({ roomName, pageNum }, cb) => {
    if (!socket.rooms.has(roomName)) return cb("You are not a member");

    const messagesPerPage = 20;

    const r = await RoomModel.findOne({ name: roomName });

    const messages = await MessageModel.find({
      room: r?.id,
    })
      .sort({ createdAt: -1, _id: 1 })
      .skip(pageNum * messagesPerPage)
      .limit(messagesPerPage);

    cb(null, { messages });
  });
};
