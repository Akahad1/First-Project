import { z } from "zod";
import { monthNames } from "./academicSemester.Model";
import { string } from "joi";

const createAcademicSemsterValidationSchema = z.object({
  body: z.object({
    name: z.enum(["Autumn", "Summer", "Fail"]),
    code: z.enum(["01", "02", "03"]),
    year: z.string(),
    startMonth: z.enum([...(monthNames as [string, ...string[]])]),
    endMonth: z.enum([...(monthNames as [string, ...string[]])]),
  }),
});

export const AcademicSemsterValidation = {
  createAcademicSemsterValidationSchema,
};
