export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, meagess: string, stack = "") {
    super(meagess);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
