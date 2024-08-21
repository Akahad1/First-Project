import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validationRequiest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constaint";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  authController.logInUser
);
router.post(
  "/change-password",
  validateRequest(AuthValidation.changePasswordValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  authController.changePassword
);

export const authRouter = router;
