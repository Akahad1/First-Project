import { Student } from "./student.model";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

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
  const result = await Student.findOne({ id: id })
    .populate("admissionSemester")
    .populate({
      path: "admissionDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const updateStudentFromDB = async (id: string, palyload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remannigStudentData } = palyload;
  const modfiedUpdateData: Record<string, unknown> = {
    ...remannigStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modfiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modfiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modfiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modfiedUpdateData);
  const result = await Student.findOneAndUpdate({ id: id }, modfiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const DeleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to Delete Student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to Delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Filled to delete User");
  }
};
export const StudentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  DeleteSingleStudentFromDB,
  updateStudentFromDB,
};
