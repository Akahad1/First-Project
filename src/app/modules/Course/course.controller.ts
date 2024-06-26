import httpStatus from "http-status";

import { CourseServices } from "./course.service";
import catchAsync from "../../utils/catchAsyc";
import { sendResponse } from "../../utils/sendRespones";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Course is created succesfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Course are retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Course is retrieved succesfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "course is updated succesfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Course is deleted succesfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculties assigned  succesfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Faculties removed  succesfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
