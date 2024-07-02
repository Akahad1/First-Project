import httpStatus from "http-status";

import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AppError } from "../../error/AppError";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.moldel";
import { AcademicDepertment } from "../academicDepertment/academicDepertment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const issemesterRegistrationExsist =
    await SemesterRegistration.findById(semesterRegistration);
  const academicSemester = issemesterRegistrationExsist?.academicSemester;

  if (!issemesterRegistrationExsist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Semseter Registar is not Exsist"
    );
  }
  const isacademicFacultyExsist =
    await AcademicFaculty.findById(academicFaculty);

  if (!isacademicFacultyExsist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Acdemic Faculty  is not Exsist"
    );
  }
  const isacademicDepartmentExsist =
    await AcademicDepertment.findById(academicDepartment);

  if (!isacademicDepartmentExsist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Acdemic Department is not Exsist"
    );
  }
  const iscourseExsist = await Course.findById(course);

  if (!iscourseExsist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Coures is not Exsist");
  }
  const isfacultyExsist = await Faculty.findById(faculty);

  if (!isfacultyExsist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculty is not Exsist");
  }

  const SameDepatmentFacult = isacademicDepartmentExsist.academicFaculty;
  if (SameDepatmentFacult !== academicFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isacademicDepartmentExsist.name} is  no exist this ${isacademicFacultyExsist.name}`
    );
  }
  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
  //check if the semester registration id is exists!

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
