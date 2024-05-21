import Joi from "joi";

// Name schema
const nameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z]*$/, { name: "capitalized" })
    .messages({
      "string.empty": "First name is required",
      "string.pattern.name": "First name must start with a capital letter",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]*$/)
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base":
        "Last name must only contain alphabetic characters",
    }),
});

// Guardian schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

// Local Guardian schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
});

// Student schema
const studentValidateSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "ID is required",
  }),
  name: nameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "{#label} is not a valid gender",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyNo: Joi.string().required().messages({
    "string.empty": "Emergency number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "AB+", "B+", "B-", "O-", "O+")
    .messages({
      "any.only": "{#label} is not a valid blood group",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
  }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidateSchema;
