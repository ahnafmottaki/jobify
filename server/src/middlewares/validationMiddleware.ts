import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  body,
  param,
  ValidationChain,
  validationResult,
} from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import mongoose from "mongoose";
import Job from "../models/job.model";

const withValidationErrors = (
  validateValues: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validateValues,
    (req: Request, res: Response<{ errors: string[] }>, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        let statusCode: number = StatusCodes.BAD_REQUEST;
        if (
          typeof errorMessages[0] === "string" &&
          errorMessages[0].startsWith("no job")
        ) {
          statusCode = StatusCodes.NOT_FOUND;
        }
        return res.status(statusCode).json({
          errors: errorMessages,
        });
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").trim().notEmpty().withMessage("company is required"),
  body("position").trim().notEmpty().withMessage("position is required"),
  body("jobLocation").trim().notEmpty().withMessage("jobLocation is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      return Promise.reject("invalid mongodb id");
    }
    const job = await Job.findById(value);
    if (!job) {
      return Promise.reject("no job found with this id " + value);
    }
  }),
]);
