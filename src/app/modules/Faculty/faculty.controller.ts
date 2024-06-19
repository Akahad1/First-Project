import httpStatus from "http-status";

import { FacultyServices } from "./faculty.service";
import catchAsync from "../../utils/catchAsyc";
import { sendResponse } from "../../utils/sendRespones";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculty is retrieved succesfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculties are retrieved succesfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculty is updated succesfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculty is deleted succesfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
