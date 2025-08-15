import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "facebook", position: "backend" },
];

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

app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// create jobs
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body || {};
  if (!company || !position) {
    return res.status(400).json({
      message: "company or position not found",
    });
  }
  const id = nanoid();
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
