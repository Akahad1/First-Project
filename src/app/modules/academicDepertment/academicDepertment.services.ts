import { TAcademicDepertment } from "./academicDepertment.interface";
import { AcademicDepertment } from "./academicDepertment.model";

const createAcademicDepertmentIntoDB = async (
  palyload: TAcademicDepertment
) => {
  const departmentIsExist = await AcademicDepertment.findOne({
    name: palyload.name,
  });
  if (departmentIsExist) {
    throw new Error("Deparment is already exist");
  }
  const result = await AcademicDepertment.create(palyload);
  return result;
};
const getAllAcademicDepertmentFromDB = async () => {
  const result = await AcademicDepertment.find();
  return result;
};

const getSingleAcademicDepertmentFromDB = async (id: string) => {
  const result = await AcademicDepertment.findOne({ id });
  return result;
};
const DeleteSingleAcademicDepertmentFromDB = async (id: string) => {
  const result = await AcademicDepertment.updateOne(
    { id },
    { isDeleted: true }
  );
  return result;
};
export const AcademicDepertmentService = {
  getAllAcademicDepertmentFromDB,
  getSingleAcademicDepertmentFromDB,
  DeleteSingleAcademicDepertmentFromDB,
  createAcademicDepertmentIntoDB,
};
