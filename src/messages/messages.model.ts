import mongoose, { Schema, Types } from "mongoose";
import { UserModel } from "../users/users.model";
import { RoomModel } from "../rooms/rooms.model";

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    room: { type: Types.ObjectId, required: true, ref: "Room" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

MessageSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const userId = this.sender;
  const roomId = this.room;

  await UserModel.updateOne({ _id: userId }, { $push: { messages: this.id } });
  await RoomModel.updateOne({ _id: roomId }, { $push: { messages: this.id } });

  next();
});

export const MessageModel = mongoose.model("Message", MessageSchema);
