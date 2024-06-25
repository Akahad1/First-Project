import mongoose, { startSession } from "mongoose";
import QureyBuilder from "../../builder/qureyBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCoursefaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const couresQurey = new QureyBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginaet()
    .fields();
  const result = await couresQurey.modelQurey;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  });
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaninigData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const upadateBasicCoureseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaninigData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!upadateBasicCoureseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed UpdateCourese");
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequest = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletePreRequestCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { course: { $in: deletePreRequest } } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!deletePreRequestCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed DeletedCourese");
      }

      //filter out new couress filed
      const newPreRequist = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequiestCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequist } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequiestCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed UpdateCourese");
      }
      const result = await Course.findById(id).populate(
        "preRequisiteCourses.course"
      );
      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed UpdateCourese");
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );

  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
