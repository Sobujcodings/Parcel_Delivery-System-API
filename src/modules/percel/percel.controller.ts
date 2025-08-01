import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { percelService } from "./percel.service";
import { any, unknown } from "zod";

const createPercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const percel = await percelService.createPercel(req.body);
    console.log("percelController", percel);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "percel Created Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const percel = await percelService.getSinglePercel(id);
    console.log("percelController", percel);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "percel get Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

export const percelController = {
  createPercel,
  getSinglePercel,
};
