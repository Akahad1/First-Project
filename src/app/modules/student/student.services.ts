import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const student = new Student(studentData);

  //   if (await student.isUserExits(studentData.id)) {
  //     throw Error("You already exits");
  //   }

  if (await Student.isUserExists(studentData.id)) {
    throw Error("You already exits");
  }

  const result = await Student.create(studentData);
  // ekane model yer upor call kore hoyca

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const DeleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  DeleteSingleStudentFromDB,
};
