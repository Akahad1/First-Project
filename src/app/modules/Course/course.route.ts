import express from "express";

import { CourseControllers } from "./course.controller";
import { CourseValidations } from "./course.validation";
import validateRequest from "../../middleware/validationRequiest";
import { userController } from "../user/user.contoller";
import { updateFacultyValidationSchema } from "../Faculty/faculty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constaint";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get(
  "/:id",
  CourseControllers.getSingleCourse,
  CourseControllers.assignFacultiesWithCourse
);
router.put(
  "/:courseId/agssin-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.delete("/:id", CourseControllers.deleteCourse);

// router.put(
//   '/:courseId/assign-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );

// router.delete(
//   '/:courseId/remove-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// );

router.get("/", auth(USER_ROLE.admin), CourseControllers.getAllCourses);

export const CourseRoutes = router;
