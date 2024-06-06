import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  password: z.string({
    invalid_type_error: "Name must be string",
  }),
});

export const academicFacultyValidation = {
  academicFacultyValidationSchema,
};
