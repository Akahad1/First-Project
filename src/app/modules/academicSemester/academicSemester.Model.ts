import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";
export const monthNames: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ["Autumn", "Summer", "Fail"],
      required: true,
    },
    code: {
      type: String,
      enum: ["01", "02", "03"],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: monthNames,
      required: true,
    },
    endMonth: {
      type: String,
      enum: monthNames,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemsterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemsterExist) {
    throw new Error("Semester is already exist!!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
