import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.contoller";
import { StudentValidation } from "../student/student.validation";
import { AnyZodObject, ZodAny } from "zod";
import validateRequest from "../../middleware/validationRequiest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidation.createStudentValidationSchema),
  userController.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);
router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);

export const userRoute = router;
