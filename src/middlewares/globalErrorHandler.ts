/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/middlewares/globalErrorHandler.ts
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { envVars } from "../config/env";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global Error:", err);

  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";

    const formattedErrors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(statusCode).json({
      success: false,
      message,
      errors: formattedErrors,
      stack: envVars.NODE_ENV === "Development" ? err.stack : undefined,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || message,
    stack: envVars.NODE_ENV === "Development" ? err.stack : undefined,
  });
};
