import { z } from "zod";

// Zod Schema for Name
const nameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

// Zod Schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Zod Schema for Local Guardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Zod Schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emargencyNo: z.string(),
      BloodGroup: z
        .enum(["A+", "A-", "AB+", "B+", "B-", "O-", "O+"])
        .optional(),
      email: z.string().email("Email is not valid"),
      presentAddress: z.string(),
      permanetAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

// Export the Zod schema
export const StudentValidation = {
  createStudentValidationSchema,
};
