// @ts-ignore
export class ApplicationError extends Error {
  constructor(
    public message?: string,
    public error?: string,
    public statusCode?: number
  ) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
  }
}
