import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const withValidationErrors = (
  validateValues: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validateValues,
    (req: Request, res: Response<{ errors: string[] }>, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: errorMessages,
        });
      }
      next();
    },
  ];
};

// export const validateTest = withValidationErrors([
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("name is required")
//     .isLength({ min: 3, max: 50 })
//     .withMessage("name must be between 3 to 50 characters long"),
// ]);

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
