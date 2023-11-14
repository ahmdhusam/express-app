import { RoomModel } from "../rooms/rooms.model";
import { CatchError } from "../utiles/catchError.decorator";
import { HttpStatus } from "../utiles/exceptions/httpstatus.enum";
import { InternalServerErrorException } from "../utiles/exceptions/internalServerError.exception";
import { NotFoundException } from "../utiles/exceptions/notFound.exception";
import { MessageModel } from "./messages.model";

export const sendMessageMiddleware = CatchError(async (req, res) => {
  const { content, roomName } = req.body;
  const room = await RoomModel.findOne({ name: roomName });
  if (!room) throw new NotFoundException("room Not Found");

  const newMessage = new MessageModel({
    content,
    room: room.id,
    sender: req.user?.id,
  });

  await newMessage.save().catch(() => {
    throw new InternalServerErrorException();
  });

  res.status(HttpStatus.CREATED).json({ message: "Created" });
});

export const getAllMessagesMiddleware = CatchError(async (req, res) => {
  const allMessages = await MessageModel.find({});
  res.json(allMessages);
});
