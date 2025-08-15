import dotenv from "dotenv";
dotenv.config();
import express, { type NextFunction, type Request, Response } from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import type { JobProp, CreateJobBody } from "./types/job";

let jobs: JobProp[] = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "facebook", position: "backend" },
];

type ResErrorProp = {
  success: false;
  message: string;
};
type ResSuccessProp<K, T extends string> = {
  success: true;
} & { [prop in T]: K };

type ResProp<K, T extends string> = ResErrorProp | ResSuccessProp<K, T>;

const app = express();

// morgan middleware use in development mode
if (process.env.NODE_ENV === "development") {
  console.log("morgan middleware added");
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running perfectly",
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Data Received",
    data: req.body,
  });
});

app.get("/api/v1/jobs", (req: Request<{}, ResProp<JobProp[], "jobs">>, res) => {
  res.status(200).json({ success: true, jobs });
});
//create jobs
app.post(
  "/api/v1/jobs",
  (req: Request<{}, ResProp<JobProp, "job">, Partial<CreateJobBody>>, res) => {
    if (!req.body?.company || !req.body?.position) {
      return res.status(400).json({
        success: false,
        message: "please provide company and position",
      });
    }
    const { company, position } = req.body;
    const id = nanoid();
    const job: JobProp = { id, company, position };
    jobs.push(job);
    res.status(201).json({ success: true, job });
  }
);

app.get(
  "/api/v1/jobs/:id",
  (req: Request<{ id: string }, ResProp<JobProp, "job">>, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!id || !job) {
      return res
        .status(404)
        .json({ success: false, message: `no job with id ${id}` });
    }
    res.status(200).json({ success: true, job });
  }
);

app.patch(
  "/api/v1/jobs/:id",
  (req: Request<{ id: string }, ResProp<JobProp, "job">>, res) => {
    if (!req.body?.company || !req.body?.position || !req.params.id) {
      return res.status(400).json({
        success: false,
        message: "please provide company and position",
      });
    }
    const { company, position } = req.body;
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: `no job with id ${id}` });
    }

    job.company = company;
    job.position = position;
    res.status(200).json({ success: true, job });
  }
);

app.delete(
  "/api/v1/jobs/:id",
  (req: Request<{ id: string }, ResProp<string, "message">>, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job || !id) {
      return res
        .status(404)
        .json({ success: false, message: `no job with id ${id}` });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;

    res.status(200).json({ success: true, message: "job deleted" });
  }
);
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
