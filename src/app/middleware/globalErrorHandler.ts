import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../error/handdeZodError";
import handleValidationError from "../error/handelValidationError";
import { TErrorSources } from "../interface/error";
import handleCastError from "../error/handleCastError";
import handleDubticatError from "../error/handleDubticatError";
import { AppError } from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  console.log(err);
  let statusCode = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  //zod  error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.megssage;
    errorSources = simplifiedError?.errorSource;
  } //mongoess model error
  else if (err?.name === "ValidatorError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.megssage;
    errorSources = simplifiedError?.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.megssage;
    errorSources = simplifiedError?.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDubticatError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.megssage;
    errorSources = simplifiedError?.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
