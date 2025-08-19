import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createdUser = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('controller', req.body);
  try {
    const users = await UserServices.createUser(req.body);
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// get all users (using the promise resolve it does not need try catch anymore)
const getUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getUser();
    console.log("result", result);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: "User retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserControllers = {
  createdUser,
  getUser,
};
