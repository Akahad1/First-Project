import { Model } from "mongoose";
import { USER_ROLE } from "./user.constaint";

export interface TUser {
  id: string;
  password: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExistByCoustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJwtIssuedBeforewordChangePassword(
    passwordChangeTime: Date,
    jwtIssuedTimeStamp: Number
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
