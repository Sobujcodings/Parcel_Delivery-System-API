import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { percelService } from "./percel.service";
import AppError from "../../utils/AppError";

// sender logic
const createPercel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const percel = await percelService.createPercel(req, req.body);
    // console.log("percelController", percel);

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
    const percel = await percelService.cancelParcel(id, req);
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

const deliveryHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const percel = await percelService.deliveryHistory(token as string);
    // console.log("percelController", percel);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "get parcel history Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

// admin logic
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const percel = await percelService.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All users get Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const getAllParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const percel = await percelService.getAllParcels();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All users get Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const percel = await percelService.updateUserRole(id);

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

const updateUserActiveStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      throw new AppError(httpStatus.NOT_FOUND, "_id, isActive status required");
    };
    const percel = await percelService.updateUserActiveStatus(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User isActive updated Successfully",
      data: percel,
    });
  } catch (error) {
    next(error);
  }
};

const updateparcelStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      throw new AppError(httpStatus.NOT_FOUND, "_id, Parcel status required");
    };
    const percel = await percelService.updateparcelStatus(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "parcel_status updated Successfully",
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
  confirmParcel,
  deliveryHistory,
  getAllUsers,
  getAllParcels,
  updateUserRole,
  updateUserActiveStatus,
  updateparcelStatus,
};
