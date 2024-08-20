import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validationRequiest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  authController.logInUser
);

export const authRouter = router;
