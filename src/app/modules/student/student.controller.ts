import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentService } from "./student.services";
import catchAsync from "../../utils/catchAsyc";
import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";

const getStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB(req.query);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "get Student is  succesfully",
    data: result,
  });
});

const getSingelStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Student is retrieved succesfully",
    data: result,
  });
});
const deletedStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.DeleteSingleStudentFromDB(studentId);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Get Student deleted Successfully",
    data: result,
  });
});
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const { student } = req.body;
  const result = await StudentService.updateStudentFromDB(studentId, student);

  res.status(200).json({
    success: true,
    message: "Get Student upadete Successfully",
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getSingelStudent,
  deletedStudent,
  updateStudent,
};
