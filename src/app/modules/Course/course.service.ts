import QureyBuilder from "../../builder/qureyBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

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

  const upadateBasicCoureseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemaninigData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePreRequest = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletePreRequestCourse = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequest } } },
    });

    //filter out new couress filed
    const newPreRequist = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted
    );

    const newPreRequiestCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequist } },
    });
  }

  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  // assignFacultiesWithCourseIntoDB,
  // removeFacultiesFromCourseFromDB,
};
