import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import JobRouter from "./routes/job.route";
import errorMiddleware from "./middlewares/errorMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import { body, validationResult } from "express-validator";
import { validateTest } from "./middlewares/validationMiddleware";

const app = express();

// morgan middleware use in development mode
if (process.env.NODE_ENV === "development") {
  console.log("morgan middleware added");
  app.use(morgan("dev"));
}

app.use(express.json());

//test route
app.post(
  "/api/v1/test",
  validateTest,
  (
    req: Request<any, { success: true; message: string }, { name: string }>,
    res: Response<{ success: true; message: string }>
  ) => {
    const { name } = req.body;
    res.json({
      success: true,
      message: `Hello ${name}`,
    });
  }
);

app.use("/api/v1/jobs", JobRouter);

// not found middleware
app.use(notFoundMiddleware);

// global error middleware
app.use(errorMiddleware);

export default app;
