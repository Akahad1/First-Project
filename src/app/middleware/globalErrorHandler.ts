import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let megssage = err.megssage || "something is wrong!";
  res.status(statusCode).json({
    success: false,
    megssage: megssage,
    error: err,
  });
};
