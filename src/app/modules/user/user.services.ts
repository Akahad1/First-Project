import { object } from "joi";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  //   set manulay id

  userData.id = "202410003";

  const NewUser = await User.create(userData);
  if (Object.keys(NewUser).length) {
    studentData.id = NewUser.id;
    studentData.user = NewUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
