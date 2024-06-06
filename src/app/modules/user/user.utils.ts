import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genareateStudenId = async (palyload: TAcademicSemester) => {
  let currentId = (0).toString().padStart(4, "0"); //0000 by default
  const lastStudentId = await findLastStudentId();
  //2031020001
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  console.log(
    "laststudenid",
    lastStudentId,
    "lastStudentCode",
    lastStudentCode,
    "lastStudentYear",
    lastStudentYear
  );

  const currentStudentCode = palyload.code;
  const currentStudentYear = palyload.year;
  console.log(
    "cureentstudentcode",
    currentStudentCode,
    "year",
    currentStudentYear
  );

  if (
    lastStudentId &&
    lastStudentCode === currentStudentCode &&
    lastStudentYear === currentStudentYear
  ) {
    currentId = lastStudentId.substring(6);
    console.log("currentcode", currentId);
  }
  console.log("bair id", currentId);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  console.log("incrementid", incrementId);
  incrementId = `${palyload.year}${palyload.code}${incrementId}`;

  return incrementId;
};
