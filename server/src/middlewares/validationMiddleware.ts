import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  body,
  param,
  ValidationChain,
  validationResult,
} from "express-validator";
import { StatusCodes } from "http-status-codes";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import mongoose from "mongoose";
import Job from "../models/job.model";
import User from "../models/user.model";
import { error } from "console";

type TypedReq = Request & {
  user: { userId: string; role: string };
};

const withValidationErrors = (
  validateValues: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validateValues,
    (req: Request, res: Response<{ errors: string[] }>, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        const firstErrorMessage = errorMessages[0];
        const isString = typeof firstErrorMessage === "string";
        let statusCode: number = StatusCodes.BAD_REQUEST;
        if (isString && firstErrorMessage.startsWith("no job")) {
          statusCode = StatusCodes.NOT_FOUND;
        } else if (isString && firstErrorMessage.startsWith("not authorized")) {
          statusCode = StatusCodes.UNAUTHORIZED;
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
  param("id").custom(async (value, { req }) => {
    const typedReq = req as TypedReq;
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new Error("invalid mongodb id");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new Error("no job found with this id " + value);
    }
    const isAdmin = typedReq.user.role === "admin";
    const isOwner = (typedReq.user.userId = job.createdBy.toString());
    if (!isAdmin && !isOwner) {
      throw new Error("not authorized to access this route");
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").trim().notEmpty().withMessage("location is required"),
  body("lastName").trim().notEmpty().withMessage("lastName is required"),
]);
export const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").trim().notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (value: string, { req }) => {
      const typedReq = req as TypedReq;
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== typedReq.user.userId) {
        throw new Error("Email already exists");
      }
    }),
  body("location").trim().notEmpty().withMessage("location is required"),
  body("lastName").trim().notEmpty().withMessage("lastName is required"),
]);
