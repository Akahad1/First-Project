export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemester = {
  name: "Autumn" | "Summer" | "Fail";
  code: "01" | "02" | "03";
  year: String;
  startMonth: TMonth;
  endMonth: TMonth;
};
