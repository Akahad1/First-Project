import path from "path";
import { Student } from "./student.model";

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "admissionDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ _id: id })
    .populate("admissionSemester")
    .populate({
      path: "admissionDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
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
