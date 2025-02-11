import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

// Format validation errors into a structured response
export const formatValidationError = (errors: any[]) => {
  if (errors.length > 0) {
    const firstError = errors[0];
    return {
      message: firstError.msg,
      error: "Bad Request",  // Customize this if needed
      statusCode: 400,  // HTTP status for invalid requests
    };
  }
  return null;
};

// Middleware to handle validation errors
export const handleValidationErrors: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  const formattedError = formatValidationError(errors.array());

  // If there are errors, return a structured error response
  if (formattedError) {
    res.status(formattedError.statusCode).json(formattedError);  // Explicit return
    return;
  }

  // No errors, move to the next middleware or route handler
  next();
};
