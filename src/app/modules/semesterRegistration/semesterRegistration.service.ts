/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.Model";
import { AppError } from "../../error/AppError";
import { SemesterRegistration } from "./semesterRegistration.model";
import QureyBuilder from "../../builder/qureyBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const isThereOngoingandUpcoming = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.ONGOING },
      { status: RegistrationStatus.UPCOMING },
    ],
  });
  if (isThereOngoingandUpcoming) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This acdemic Semester upcomming"
    );
  }
  const academicSemester = payload?.academicSemester;
  //chack acdademicSemesterExist
  const isExsistAcademicSemester =
    await AcademicSemester.findById(academicSemester);
  if (!isExsistAcademicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "This acdemic Semester not Found");
  }

  // chack SemsterREgistar Exist??
  const isSemesterReisterExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterReisterExist) {
    throw new AppError(httpStatus.CONFLICT, "This acdemic Semester is Exsist");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQurey = new QureyBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .fields()
    .paginaet()
    .sort();
  const result = await semesterRegistrationQurey.modelQurey;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */
  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterReisterExist = await SemesterRegistration.findById(id);

  if (!isSemesterReisterExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This  Semester is not Found");
  }
  //If the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterReisterExist.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(httpStatus.BAD_REQUEST, "This SemsterREfistrarin END");
  }
  const requestedStatus = payload?.status;
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not direacly upadate ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not direacly upadate ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/
  // checking if the semester registration is exist
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
