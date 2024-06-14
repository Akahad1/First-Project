import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validationRequiest";
import { StudentValidation } from "./student.validation";

const router = express.Router();

router.get("/", StudentController.getStudent);
router.get("/:studentId", StudentController.getSingelStudent);
router.delete("/:studentId", StudentController.deletedStudent);
router.patch(
  "/:studentId",
  //   validateRequest(StudentValidation.upadeteStudentValidationSchema),
  StudentController.updateStudent
);

export const studentRoute = router;
