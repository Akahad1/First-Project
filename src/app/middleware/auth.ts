import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsyc";
import { AppError } from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are Unauthorize!");
    }
    // invalid token
    const decoded = jwt.verify(
      token,
      config.JWT_ACCEESS_SECRET as string
    ) as JwtPayload;

    const { role, userId } = decoded;
    const user = await User.isUserExistByCoustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "this user not found");
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, "this user not deleted");
    }
    const isStatus = user?.status;
    if (isStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "this user is blocked");
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are Unauthorize!");
    }
    req.user = decoded;
    next();
  });
};

export default auth;
