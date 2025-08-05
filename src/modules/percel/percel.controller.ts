import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { percelService } from "./percel.service";

// sender logic
const createPercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const percel = await percelService.createPercel(req, req.body);
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

const cancelParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const percel = await percelService.cancelParcel(id);
    // console.log("percelController", percel);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "percel cancel Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const getStatusLogPercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const percel = await percelService.getStatusLogPercel(id);
    // console.log("percelController", percel);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "percel statusLog get Successfully",
      data: percel?.statusLog || [],
    });
  } catch (error) {
    next(error);
  }
};


// receiver logic
const getIncomingPercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const id = req.header;
    const percel = await percelService.getIncomingPercel(req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Incoming percels get Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const confirmParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const percel = await percelService.confirmParcel(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Parcel Confirm Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

export const percelController = {
  createPercel,
  getSinglePercel,
  cancelParcel,
  getStatusLogPercel,
  getIncomingPercel,
  confirmParcel
};
