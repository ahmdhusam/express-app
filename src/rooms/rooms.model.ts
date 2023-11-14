import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import { UserModel } from "../users/users.model";

const RoomSchema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true, unique: true },
    messages: [{ type: Types.ObjectId, required: true, ref: "Message" }],
  },
  { timestamps: true }
);

RoomSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const userId = this.owner;

  await UserModel.updateOne({ _id: userId }, { $push: { rooms: this.id } });
  next();
});

export const RoomModel = mongoose.model("Room", RoomSchema);
