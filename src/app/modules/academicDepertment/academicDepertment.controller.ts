import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";

import { AcademicDepertmentService } from "./academicDepertment.services";
import catchAsync from "../../utils/catchAsyc";

const createAcademicDepertment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepertmentService.createAcademicDepertmentIntoDB(
    req.body
  );

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicSemester is create Successfully",
    data: result,
  });
});

const getAcademicDepertmentSemester = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepertmentService.getAllAcademicDepertmentFromDB();
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicDepertment is get Successfully",
    data: result,
  });
});

const getSingleAcademicDepertmentData = catchAsync(async (req, res) => {
  const params = req.params.depertmentId;
  console.log("d", params);
  const result =
    await AcademicDepertmentService.getSingleAcademicDepertmentFromDB(params);
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Single AcademicDepertment is get",
    data: result,
  });
});

export const AcademicDepertmentController = {
  createAcademicDepertment,
  getAcademicDepertmentSemester,
  getSingleAcademicDepertmentData,
};
