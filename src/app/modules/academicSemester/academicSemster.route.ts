import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleware/validationRequiest";
import { AcademicSemsterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemsterValidation.createAcademicSemsterValidationSchema
  ),
  academicSemesterController.createacademicSemester
);

router.get("/", academicSemesterController.getAcademicSemester);
router.get(
  "/:academicSemesterId",
  academicSemesterController.getSingleAcdecsemesterData
);

export const academicSemesterRoute = router;
