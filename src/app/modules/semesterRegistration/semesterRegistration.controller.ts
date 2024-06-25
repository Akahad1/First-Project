import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsyc";
import { sendResponse } from "../../utils/sendRespones";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body
      );
    sendResponse(res, {
      satatusCode: httpStatus.OK,
      success: true,
      mesages: "SemesterRegistration assigned  succesfully",
      data: result,
    });
  }
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query
      );

    sendResponse(res, {
      satatusCode: httpStatus.OK,
      success: true,
      mesages: "SemesterRegistration get  succesfully",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id
      );
    sendResponse(res, {
      satatusCode: httpStatus.OK,
      success: true,
      mesages: "SemesterRegistration get  single data succesfully",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );
    sendResponse(res, {
      satatusCode: httpStatus.OK,
      success: true,
      mesages: "SemesterRegistration Update succesfully",
      data: result,
    });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {}
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
