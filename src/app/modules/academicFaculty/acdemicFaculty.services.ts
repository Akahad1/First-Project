import { AcademicFaculty } from "./academicFaculty.moldel";
import { TAcademicFaculty } from "./acdemicFaculty.interface";

const createAcademicFacultyIntoDB = async (palyload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(palyload);
  return result;
};
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ id });
  return result;
};
const DeleteSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.updateOne({ id }, { isDeleted: true });
  return result;
};
export const AcademicFacultyService = {
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  DeleteSingleAcademicFacultyFromDB,
  createAcademicFacultyIntoDB,
};
