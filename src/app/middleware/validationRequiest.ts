import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsyc";

const validateRequest = (schma: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // chack validation
    // if all right data the next()
    await schma.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
