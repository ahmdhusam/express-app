import { ApplicationError } from "./application.error";
import { HttpStatus } from "./httpstatus.enum";

export class NotFoundException extends ApplicationError {
  constructor(message?: string) {
    super(message, "Not Found", HttpStatus.NOT_FOUND);
  }
}
