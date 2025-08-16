import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import JobRouter from "./routes/job.route";
import errorMiddleware from "./middlewares/errorMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import { authenticateUser } from "./middlewares/authMiddleware";
import cookieParser from "cookie-parser";

const app = express();

// morgan middleware use in development mode
if (process.env.NODE_ENV === "development") {
  console.log("morgan middleware added");
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, JobRouter);

// not found middleware
app.use(notFoundMiddleware);

// global error middleware
app.use(errorMiddleware);

export default app;
