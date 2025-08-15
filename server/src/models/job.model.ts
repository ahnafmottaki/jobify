import mongoose, { type InferSchemaType } from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "interview",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

export type JobModel = InferSchemaType<typeof JobSchema>;

export default mongoose.model("Job", JobSchema);
