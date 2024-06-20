import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsyc";
import { sendResponse } from "../../utils/sendRespones";
import { AdminServices } from "./admin.service";

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Admin is retrieved succesfully",
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Admins are retrieved succesfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Admin is updated succesfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    satatusCode: httpStatus.OK,
    success: true,
    mesages: "Admin is deleted succesfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
