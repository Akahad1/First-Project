import { Schema, model } from "mongoose";
import config from "../config/index";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from "./student/student.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import { get } from "http";

const userNameSchema = new Schema<TName>({
  firstName: {
    type: String,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    // required: [true, "Last name is required"],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),

    //   message: "{VALUE} IS NOT STRING",
    // },
  },
});

const userGuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const userLocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, "ID is required"], unique: true },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emargencyNo: {
      type: String,
      required: [true, "Emergency number is required"],
    },
    BloodGroup: {
      type: String,
      enum: ["A+", "A-", "AB+", "B+", "B-", "O-", "O+"],
      message: "{VALUE} is not a valid blood group",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid",
      },
    },

    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanetAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: userGuardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: userLocalGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// cteate instance

// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// create static

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// middelware : we work on create() save()

studentSchema.pre("save", async function (next) {
  // console.log(this, " pre hook : we will save data");
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYT_SALT_ROUND)
  );
  next();
});

studentSchema.post("save", function (doc, next) {
  // console.log(this, " post hook : we  saved our data");
  doc.password = "";
  next();
});

// qurey middelware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// vartul

studentSchema.virtual("fullname").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
