import { Schema, Types, model } from "mongoose";
import { TAcademicDepertment } from "./academicDepertment.interface";
import { AppError } from "../../error/AppError";

const academicDepertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "",
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepertment = model<TAcademicDepertment>(
  "AcdemicDepertment",
  academicDepertmentSchema
);

// academicDepertmentSchema.pre("findOneAndUpdate", async function (next) {
//   const qurey = this.getQuery();
//   const departmentIsExist = await AcademicDepertment.findOne({
//     qurey,
//   });
//   if (!departmentIsExist) {
//     throw new AppError(404, "this deparment is does not exist");
//   }
//   next();
// });
