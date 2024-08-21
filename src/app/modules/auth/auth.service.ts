import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";

const logInUserInToDatabase = async (playload: TLoginUser) => {
  const user = await User.isUserExistByCoustomId(playload.id);
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

  // console.log(ispasswordMatch);
  if (!(await User.isPasswordMatched(playload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "this Password not Macthed");
  }
  const jsonPlayload = {
    userId: user.id,
    role: user.role,
  };
  //create AccessToken
  const accessToken = jwt.sign(
    jsonPlayload,
    config.JWT_ACCEESS_SECRET as string,
    { expiresIn: "10d" }
  );
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  playload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistByCoustomId(userData.userId);
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

  // console.log(ispasswordMatch);
  if (!(await User.isPasswordMatched(playload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "this Password not Macthed");
  }
  const hashedPassword = await bcrypt.hash(
    playload.newPassword,
    Number(config.BCRYT_SALT_ROUND)
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
};
export const authServices = {
  logInUserInToDatabase,
  changePassword,
};
