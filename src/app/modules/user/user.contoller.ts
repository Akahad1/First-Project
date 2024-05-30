import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendRespones";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    //  data validate Using joi
    // const { error, value } = studentValidateSchema.validate(studentData);
    // console.log({ error }, { value });
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: "SomeThing is Rong",
    //     error,
    //   });
    // }

    // data validate Using joz

    // const zodParseData = StudentValidationSchemas.parse(studentData);

    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    // res.status(200).json({
    //   success: true,
    //   message: "student is create Successfully",
    //   data: result,
    // });

    sendResponse(res, {
      satatusCode: httpStatus.OK,
      success: true,
      mesages: "student is create Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
