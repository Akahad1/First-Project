import { Request, Response } from "express";
import { StudentService } from "./student.services";
import { StudentValidationSchemas } from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // const joiValidateSchema = Joi.object({
    //   id: Joi.string(),
    //   name: {
    //     firstName: Joi.string().max(20).required(),
    //     middleName: Joi.string().max(20),
    //     lastName: Joi.string().max(20),
    //   },
    //   gender: Joi.string().required().valid(["male", "female", "other"]),
    // });

    const { student: studentData } = req.body;

    //  data validate Using joi
    // const { error, value } = studentValidateSchema.validate(studentData);
    // console.log({ error }, { value });
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: "SomeThing is Rong",
    //     error,
    //   });
    // }

    // data validate Using joz

    const zodParseData = StudentValidationSchemas.parse(studentData);

    const result = await StudentService.createStudentIntoDB(studentData);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "student is create Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "SomeThing is Rong",
      error: err,
    });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Get Student Data Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingelStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentService.getSingleStudentFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Get Student Data Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getStudent,
  getSingelStudent,
};
