import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentService } from "./student.services";
import catchAsync from "../../utils/catchAsyc";

const getStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();
  console.log(result);
  res.status(200).json({
    success: true,
    message: "Get Student Data Successfully",
    data: result,
  });
});

const getSingelStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  console.log(result);
  res.status(200).json({
    success: true,
    message: "Get Student Data Successfully",
    data: result,
  });
});
const deletedStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.DeleteSingleStudentFromDB(studentId);
  console.log(result);
  res.status(200).json({
    success: true,
    message: "Get Student deleted Successfully",
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getSingelStudent,
  deletedStudent,
};
