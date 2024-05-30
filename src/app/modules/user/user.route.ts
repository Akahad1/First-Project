import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.contoller";

const router = express.Router();

const senabahine = (name: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {};
};

router.post(
  "/create-student",
  senabahine("sahad"),
  userController.createStudent
);

export const userRoute = router;
