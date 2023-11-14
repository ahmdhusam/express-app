import { ApplicationError } from "./application.error";
import { HttpStatus } from "./httpstatus.enum";

export class UnauthorizedException extends ApplicationError {
  constructor(message?: string) {
    super(message, "Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}
