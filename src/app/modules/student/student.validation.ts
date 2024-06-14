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

const upadeteNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Zod Schema for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

// Zod Schema for Local Guardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Zod Schema for Student
const upadeteStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: upadeteNameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().optional(),
      emargencyNo: z.string().optional(),
      BloodGroup: z
        .enum(["A+", "A-", "AB+", "B+", "B-", "O-", "O+"])
        .optional(),
      email: z.string().email("Email is not valid").optional(),
      presentAddress: z.string().optional(),
      permanetAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      admissionSemester: z.string().optional(),
      admissionDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

// Export the Zod schema
export const StudentValidation = {
  createStudentValidationSchema,
  upadeteStudentValidationSchema,
};
