import { AcademicSemester } from "./academicSemester.Model";
import { TAcademicSemester } from "./academicSemester.interface";

const createacademicSemesterIntoDB = async (palyload: TAcademicSemester) => {
  type TacademicSemesterNameCodeMapper = {
    [key: string]: string;
  };
  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fail: "03",
  };

  if (academicSemesterNameCodeMapper[palyload.name] !== palyload.code) {
    throw new Error("Invelide semster code");
  }
  const result = await AcademicSemester.create(palyload);
  return result;
};

const getAcAdemicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcdecsemesterDataIntoDB = async (id: any) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

export const academicSemesterServies = {
  createacademicSemesterIntoDB,
  getAcAdemicSemesterIntoDB,
  getSingleAcdecsemesterDataIntoDB,
};
