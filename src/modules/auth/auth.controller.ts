import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthCredentailService } from "./auth.service";

const credentailsLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginInfo = await  AuthCredentailService.credentailsLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login Successfully",
      data: loginInfo,
    });
  } catch (error) {
    next(error);
    // then this error will show from the global error handler using next()
  }
};


export const AuthController = {
    credentailsLogin,

}
