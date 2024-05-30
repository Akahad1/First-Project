import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router.get("/", StudentController.getStudent);
router.get("/:studentId", StudentController.getSingelStudent);
router.delete("/:studentId", StudentController.deletedStudent);

export const studentRoute = router;
