import { Student } from "./student.model";
import { TStudent } from "./student.interface";

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
  getAllStudentFromDB,
  getSingleStudentFromDB,
  DeleteSingleStudentFromDB,
};
