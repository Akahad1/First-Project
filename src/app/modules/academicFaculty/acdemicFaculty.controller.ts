import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsyc";
import { AcademicFacultyService } from "./acdemicFaculty.services";

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicSemester is create Successfully",
    data: result,
  });
});

const getAcademicFacultySemester = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "AcademicFaculty is get Successfully",
    data: result,
  });
});

const getSingleAcademicFacultyData = catchAsync(async (req, res) => {
  const params = req.params.academicFaculyId;
  const result =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(params);
  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Single AcademicFaculty is get",
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFacultySemester,
  getSingleAcademicFacultyData,
};
