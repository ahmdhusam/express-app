import { Server, Socket } from "socket.io";
import { RoomModel } from "../../rooms/rooms.model";
import { roomNameWsValidator } from "./rooms.validators";
import { RoomOpt } from "./roomOpt.enum";

export const roomsHandler = (io: Server, socket: Socket) => {
  socket.use(roomNameWsValidator(RoomOpt.Create));
  socket.on(RoomOpt.Create, async ({ roomName }, cb) => {
    const newRoom = new RoomModel({
      owner: socket.data.user.id,
      name: roomName,
    });

    try {
      await newRoom.save();
      socket.join(roomName);
      cb(null, "The room created successfully");
    } catch (_) {
      cb("roomName in use");
    }
  });

  socket.use(roomNameWsValidator(RoomOpt.Join));
  socket.on(RoomOpt.Join, async ({ roomName }, cb) => {
    const onlineRoom = io.sockets.adapter.rooms.get(roomName);
    const savedRoom = await RoomModel.findOne({ name: roomName });

    if (!onlineRoom && !savedRoom) return cb("Room Not Found");

    if (socket.rooms.has(roomName)) return cb(null, "joined");

    socket.join(roomName);
    socket.broadcast
      .to(roomName)
      .emit("room:joined", socket.data.user.username);
    cb(null, "joined");
  });

  socket.use(roomNameWsValidator(RoomOpt.List));
  socket.on(RoomOpt.List, async ({ roomName }, cb) => {
    const roomList = await io.in(roomName).fetchSockets();

    if (!socket.rooms.has(roomName)) return cb("You are not a member");

    cb(
      null,
      roomList.map((s) => ({
        id: s.data.user.id,
        username: s.data.user.username,
      }))
    );
  });
};
