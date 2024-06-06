import express from "express";
import validateRequest from "../../middleware/validationRequiest";
import { academicFacultyController } from "./acdemicFaculty.controller";
import { academicFacultyValidation } from "./acdemicFaculty.validation";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty
);

router.get("/", academicFacultyController.getAcademicFacultySemester);
router.get(
  "/:academicFacultyId",
  academicFacultyController.getSingleAcademicFacultyData
);

export const academicFacultyRoute = router;
