import express from "express";
import validateRequest from "../../middleware/validationRequiest";
import { AcademicDepertmentController } from "./academicDepertment.controller";
import { academicDepertmentValidation } from "./academicDepertment.validatinon";

const router = express.Router();

router.post(
  "/create-academic-depertment",
  // validateRequest(
  //   academicDepertmentValidation.academicDepertmentValidationSchema
  // ),
  AcademicDepertmentController.createAcademicDepertment
);

router.get("/", AcademicDepertmentController.getAcademicDepertmentSemester);
router.get(
  "/:depertmentId",
  AcademicDepertmentController.getSingleAcademicDepertmentData
);

export const academicDepertmentRoute = router;
