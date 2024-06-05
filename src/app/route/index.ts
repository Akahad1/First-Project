import { academicSemesterRoute } from "../modules/academicSemester/academicSemster.route";
import { studentRoute } from "../modules/student/student.router";
import { userRoute } from "../modules/user/user.route";
import Router from "express";

const router = Router();

const modulesRoute = [
  {
    path: "/students",
    route: studentRoute,
  },
  { path: "/users", route: userRoute },
  { path: "/acdemic-semester", route: academicSemesterRoute },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
