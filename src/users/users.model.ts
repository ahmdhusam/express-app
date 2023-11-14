import mongoose, { Schema, Types } from "mongoose";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    messages: [{ type: Types.ObjectId, required: true, ref: "Message" }],
    rooms: [{ type: Types.ObjectId, required: true, ref: "Room" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 9);

  next();
});

UserSchema.methods.isMatch = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export const UserModel = mongoose.model("User", UserSchema);
