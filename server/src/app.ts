import express from "express";
const app = express();

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
