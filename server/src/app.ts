import dotenv from "dotenv";
dotenv.config();
import express, { type NextFunction, type Request, Response } from "express";
import morgan from "morgan";
import JobRouter from "./routes/job.route";

const app = express();

// morgan middleware use in development mode
if (process.env.NODE_ENV === "development") {
  console.log("morgan middleware added");
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", JobRouter);
app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "Page not found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ success: false, message: "page not found" });
});
export default app;
