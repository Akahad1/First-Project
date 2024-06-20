import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.Model";
import {
  genareateStudenId,
  generateAdminId,
  generateFacultyId,
} from "./user.utils";
import mongoose, { NullExpression } from "mongoose";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { Faculty } from "../Faculty/faculty.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepertment } from "../academicDepertment/academicDepertment.model";
import { Admin } from "../Admin/admin.model";

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
    throw new Error("failed to crated user");
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepertment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
