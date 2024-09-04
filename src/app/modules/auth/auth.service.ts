import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";

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
  const jwtPlayload = {
    userId: user.id,
    role: user.role,
  };
  //create AccessToken
  const accessToken = createToken(
    jwtPlayload,
    config.JWT_ACCEESS_SECRET as string,
    config.JWT_ACCEESS_TOKEN_EXPIRE as string
  );
  //create refreshToken
  const refreshToken = createToken(
    jwtPlayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_TOKEN_EXPIRE as string
  );

  return {
    accessToken,
    refreshToken,
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
const refreshToken = async (token: string) => {
  // invalid token
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_SECRET as string
  ) as JwtPayload;

  const { userId, iat } = decoded;
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
  if (
    user.passwordChangeAt &&
    User.isJwtIssuedBeforewordChangePassword(
      user.passwordChangeAt,
      iat as number
    )
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Your are Unauthorize!");
  }
  const jwtPlayload = {
    userId: user.id,
    role: user.role,
  };
  //create AccessToken
  const accessToken = createToken(
    jwtPlayload,
    config.JWT_ACCEESS_SECRET as string,
    config.JWT_ACCEESS_TOKEN_EXPIRE as string
  );
  return {
    accessToken,
  };
};
export const authServices = {
  logInUserInToDatabase,
  changePassword,
  refreshToken,
};
