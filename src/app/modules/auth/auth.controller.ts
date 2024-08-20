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

export const authController = {
  logInUser,
};
