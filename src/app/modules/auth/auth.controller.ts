import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendRespones";
import catchAsync from "../../utils/catchAsyc";
import { authServices } from "./auth.service";
import config from "../../config";

const logInUser = catchAsync(async (req, res) => {
  const result = await authServices.logInUserInToDatabase(req.body);
  const { refreshToken, needsPasswordChange, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Log In  succesfully",
    data: {
      accessToken,
      needsPasswordChange,
    },
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
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Access Token retrived  succesfully",
    data: result,
  });
});

export const authController = {
  logInUser,
  changePassword,
  refreshToken,
};
