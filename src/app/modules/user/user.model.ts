import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

export const User = model<TUser>("User", userSchema);
