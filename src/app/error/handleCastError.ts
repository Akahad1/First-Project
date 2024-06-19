import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespone } from "../interface/error";
import path from "path";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorRespone => {
  const errorSource: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    megssage: "invalied ID",
    errorSource,
  };
};

export default handleCastError;
