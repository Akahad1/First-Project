import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespone } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorRespone => {
  const errorSource: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    megssage: " validation Error",
    errorSource,
  };
};

export default handleValidationError;
