import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendRespones";
import catchAsync from "../../utils/catchAsyc";
import { authServices } from "./auth.service";

const logInUser = catchAsync(async (req, res) => {
  const result = await authServices.logInUserInToDatabase(req.body);
  console.log(req.body);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Log In  succesfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  console.log(req.user, req.body);
  const user = req.user;
  const { ...Password } = req.body;
  const result = await authServices.changePassword(user, Password);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Password change succesfully",
    data: result,
  });
});

export const authController = {
  logInUser,
  changePassword,
};
