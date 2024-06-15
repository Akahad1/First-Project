import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TGenericErrorRespone } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorRespone => {
  const errorSource: any = err.issues.map((issues: ZodIssue) => {
    return {
      path: issues?.path[issues.path.length - 1],
      message: issues.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    megssage: " validation Error",
    errorSource,
  };
};

export default handleZodError;
