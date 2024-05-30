import { Response } from "express";

type TResponse<T> = {
  satatusCode: number;
  success: boolean;
  mesages?: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.satatusCode).json({
    success: data.success,
    mesages: data.mesages,
    data: data.data,
  });
};
