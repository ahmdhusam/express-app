import { IPayload } from "./payload.interface";
import jwt from "jsonwebtoken";

export const isValidToken = (token: string, data: IPayload): boolean => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as IPayload;

    if (!("sub" in payload)) throw new Error();

    Object.assign(data, payload);

    return true;
  } catch (_) {
    return false;
  }
};
