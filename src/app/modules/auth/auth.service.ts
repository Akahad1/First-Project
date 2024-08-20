import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const logInUserInToDatabase = async (playload: TLoginUser) => {
  const user = await User.isUserExistByCoustomId(playload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not found");
  }

  const isDeleted = await user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not deleted");
  }
  const isStatus = await user.status;
  if (isStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked");
  }

  // console.log(ispasswordMatch);
  if (!(await User.isMactehPassword(playload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "this Password not Macthed");
  }
};

export const authServices = {
  logInUserInToDatabase,
};
