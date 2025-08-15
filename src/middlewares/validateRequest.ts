import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validationRequest = (zodSchema : ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
      // req.body same
      (req as any).body = await zodSchema.parseAsync(req.body);
      console.log(req.body);
      // if validation complete(meaning zod validation matches with requested body) go to next to further process here move to user controller and createUser
      // next() --> to move back to the process where it has been called/used which is user.route
      next();
    } catch (error) {
      next(error);
    }
};