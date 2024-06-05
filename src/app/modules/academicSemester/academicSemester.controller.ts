import { NextFunction, Request, RequestHandler, Response } from "express";

import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsyc";
import { academicSemesterServies } from "./academicSemster.services";

const createacademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServies.createacademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicSemester is create Successfully",
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServies.getAcAdemicSemesterIntoDB();
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicSemester is get Successfully",
    data: result,
  });
});

const getSingleAcdecsemesterData = catchAsync(async (req, res) => {
  const params = req.params.academicSemesterId;
  const result =
    await academicSemesterServies.getSingleAcdecsemesterDataIntoDB(params);
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Single AcademicSemester is get",
    data: result,
  });
});

export const academicSemesterController = {
  createacademicSemester,
  getAcademicSemester,
  getSingleAcdecsemesterData,
};
