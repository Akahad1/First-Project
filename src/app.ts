import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import { userRoute } from "./app/modules/user/user.route";
import { notFound } from "./app/middleware/notFound";
import router from "./app/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// parse

app.use(express.json());
app.use(cors());

// applicatinon route

app.use("/api/v1", router);

app.get("/api/v1", (req: Request, res: Response) => {
  const a = 30;
  res.send(a);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
