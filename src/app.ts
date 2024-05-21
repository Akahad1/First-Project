import express, { Request, Response } from "express";
import cors from "cors";
import { studentRoute } from "./app/modules/student/student.router";

const app = express();

// parse

app.use(express.json());
app.use(cors());

// applicatinon route

app.use("/api/v1/students", studentRoute);

app.get("/api/v1", (req: Request, res: Response) => {
  const a = 30;
  res.send(a);
});

export default app;
