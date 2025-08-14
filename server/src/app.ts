import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";

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

export default app;
