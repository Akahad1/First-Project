import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.Model";
import { genareateStudenId } from "./user.utils";
import { NullExpression } from "mongoose";

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
  userData.id = await genareateStudenId(admissionSemester);

  const NewUser = await User.create(userData);
  if (Object.keys(NewUser).length) {
    palyload.id = NewUser.id;
    palyload.user = NewUser._id;

    const newStudent = await Student.create(palyload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
