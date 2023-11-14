import { ApplicationError } from "./application.error";
import { HttpStatus } from "./httpstatus.enum";

export class ConflictException extends ApplicationError {
  constructor(message?: string) {
    super(message, "Conflict", HttpStatus.CONFLICT);
  }
}
