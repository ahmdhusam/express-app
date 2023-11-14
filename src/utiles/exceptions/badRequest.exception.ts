import { ApplicationError } from "./application.error";
import { HttpStatus } from "./httpstatus.enum";

export class BadRequestException extends ApplicationError {
  constructor(message?: string) {
    super(message, "Bad Request", HttpStatus.BAD_REQUEST);
  }
}
