import { CatchError } from "../utiles/catchError.decorator";
import { ConflictException } from "../utiles/exceptions/conflict.exception";
import { HttpStatus } from "../utiles/exceptions/httpstatus.enum";
import { InternalServerErrorException } from "../utiles/exceptions/internalServerError.exception";
import { UserModel } from "./users.model";

export const registerUserMiddleware = CatchError(async (req, res) => {
  const newUser = new UserModel(req.body);

  await newUser.save().catch(({ code }) => {
    switch (code) {
      case 11000:
        throw new ConflictException("username in use");
      default:
        throw new InternalServerErrorException();
    }
  });

  res.status(HttpStatus.CREATED).json({ message: "Created" });
});

export const getAllUsersMiddleware = CatchError(async (req, res) => {
  const allUsers = await UserModel.find({}).select("-messages -rooms");
  res.json(allUsers);
});
