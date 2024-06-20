import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsyc";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  //  data validate Using joi
  // const { error, value } = studentValidateSchema.validate(studentData);
  // console.log({ error }, { value });
  // if (error) {
  //   res.status(400).json({
  //     success: false,
  //     message: "SomeThing is Rong",
  //     error,
  //   });
  // }

  // data validate Using joz

  // const zodParseData = StudentValidationSchemas.parse(studentData);

  const result = await userServices.createStudentIntoDB(password, studentData);

  // res.status(200).json({
  //   success: true,
  //   message: "student is create Successfully",
  //   data: result,
  // });

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "student is create Successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Admin is created succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
