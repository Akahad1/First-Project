import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { clearScreenDown } from "readline";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeAt: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// middelware : we work on create() save()

userSchema.pre("save", async function (next) {
  // console.log(this, " pre hook : we will save data");
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYT_SALT_ROUND)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  // console.log(this, " post hook : we  saved our data");
  doc.password = "";
  next();
});
userSchema.statics.isUserExistByCoustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (
  plineTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plineTextPassword, hashPassword);
};
userSchema.statics.isJwtIssuedBeforewordChangePassword = async function (
  passwordChangeTimeStap: Date,
  jwtIssuedTimeStamp: number
) {
  const passwordChangeTime = new Date(passwordChangeTimeStap).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimeStamp;
};
export const User = model<TUser, UserModel>("User", userSchema);
