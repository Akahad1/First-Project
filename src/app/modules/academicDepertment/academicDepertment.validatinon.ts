import { z } from "zod";

const academicDepertmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
    }),
    academicFaculty: z.string({
      invalid_type_error: "AcdemicFaculty must be string",
      required_error: "Faculty must be required",
    }),
  }),
});

export const academicDepertmentValidation = {
  academicDepertmentValidationSchema,
};
