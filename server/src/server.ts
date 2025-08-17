// server.ts (or entry file)
import mongoose from "mongoose";
import app from "./app";

(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
})();

app.listen(process.env.PORT);
console.log("✅ Connected to MongoDB");
