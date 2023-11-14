import { UserModel } from "../users/users.model";
import { CatchError } from "../utiles/catchError.decorator";
import jwt from "jsonwebtoken";
import { BadRequestException } from "../utiles/exceptions/badRequest.exception";
import { NotFoundException } from "../utiles/exceptions/notFound.exception";

export const authenticateMiddleware = CatchError(async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    username,
  }).select({ password: 1 });

  if (!user) throw new NotFoundException("user Not Found");

  // @ts-ignore
  if (!(await user.isMatch(password)))
    throw new BadRequestException("password is incorrect");

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  res.json({ token, expiresIn: "1 Day" });
});
