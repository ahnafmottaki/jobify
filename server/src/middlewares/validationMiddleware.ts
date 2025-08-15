import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const withValidationErrors = (
  validateValues: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: getReasonPhrase(StatusCodes.BAD_REQUEST),
          errors: errorMessages,
        });
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be between 3 to 50 characters long"),
]);
