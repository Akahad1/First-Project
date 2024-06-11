import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.Model";
import { genareateStudenId } from "./user.utils";
import mongoose, { NullExpression } from "mongoose";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, palyload: TStudent) => {
  // const student = new Student(studentData);

  //   if (await student.isUserExits(studentData.id)) {
  //     throw Error("You already exits");
  //   }

  // if (await Student.isUserExists(studentData.id)) {
  //   throw Error("You already exits");
  // }

  //   create user object
  const userData: Partial<TUser> = {};

  //  if client does not make password

  userData.password = password || (config.default_password as string);

  // set role

  userData.role = "student";
  //  your semster code 4 digit number

  //   set manulay id

  const admissionSemester: any = await AcademicSemester.findById(
    palyload.admissionSemester
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await genareateStudenId(admissionSemester);
    // create a user (Transcation-1 )
    const NewUser = await User.create([userData], { session });
    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to Create User");
    }
    palyload.id = NewUser[0].id;
    palyload.user = NewUser[0]._id;
    // create a user (Transcation-2 )
    const newStudent = await Student.create([palyload], { session });
    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to Create Student");
    }

    await session.commitTransaction();

    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
};
