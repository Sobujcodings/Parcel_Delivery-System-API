import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthCredentailService } from "./auth.service";
import AppError from "../../utils/AppError";

const credentailsLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginInfo = await  AuthCredentailService.credentailsLogin(req.body);

    // send refresh token to the response cookies while login
    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });
    // send refresh token to the response cookies while login
    res.cookie("refreshToken", loginInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });

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

const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // take refreshtoken in cookies from the request that was inserted in cookies while login
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "No refresh token found in cookies");
    }

    const tokenInfo = await AuthCredentailService.getNewAccessToken(refreshToken);

    // send refresh token to the response cookies while login
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login Successfully",
      data: tokenInfo,
    });
  } catch (error) {
    next(error);
  }
};


export const AuthController = {
    credentailsLogin,
    getNewAccessToken,
}
