import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import JobRouter from "./routes/job.route";
import errorMiddleware from "./middlewares/errorMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";

const app = express();

// morgan middleware use in development mode
if (process.env.NODE_ENV === "development") {
  console.log("morgan middleware added");
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", JobRouter);

// not found middleware
app.use(notFoundMiddleware);

// global error middleware
app.use(errorMiddleware);

export default app;
