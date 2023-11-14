import { ApplicationError } from "./application.error";
import { HttpStatus } from "./httpstatus.enum";

export class InternalServerErrorException extends ApplicationError {
  constructor(message?: string) {
    super(message, "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
