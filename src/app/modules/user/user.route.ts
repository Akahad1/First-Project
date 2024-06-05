import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.contoller";
import { StudentValidation } from "../student/student.validation";
import { AnyZodObject, ZodAny } from "zod";
import validateRequest from "../../middleware/validationRequiest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidation.createStudentValidationSchema),
  userController.createStudent
);

export const userRoute = router;
