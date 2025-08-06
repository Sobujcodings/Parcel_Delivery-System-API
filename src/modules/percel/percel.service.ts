/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { Request } from "express";
import AppError from "../../utils/AppError";
import { User } from "../user/user.model";
import { Ipercel, ParcelStatus } from "./percel.interface";
import { percel } from "./percel.model";
import httpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { IsActive, Role } from "../user/user.interface";

// sender route
const createPercel = async (req: Request, payload: Partial<Ipercel>) => {
  // automatically generated trackingId
  const trackingId = "TRK" + Date.now();
  payload.trackingId = trackingId;

  // ai req r token theke verify koren/decode kore jei id ber korbo shetai hobe senderId
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "user token is not found, please login first"
    );
  };

  const decoded = jwt.decode(token, { complete: true }) as JwtPayload;
  if (decoded.payload.isActive === 'BLOCKED') {
    throw new AppError(httpStatus.BAD_REQUEST, `Failed, this user is ${decoded.payload.isActive} now`);
  };

  payload.senderId = (decoded as JwtPayload)?.payload.userId;
  // checking if the sender mail n receiver mail has user not or then send their id with the response here
  const receiver = await User.findOne({ email: payload.receiver_email });
  payload.receiverId = receiver?._id || null;

  // default statuslog
  payload.statusLog = [
    {
      location: "System",
      timestamp: new Date(),
      status: ParcelStatus.Requested,
      note: "Parcel created and request submitted.",
    },
  ];

  const createdPercel = await percel.create(payload);
  // console.log("createdPercel", createdPercel);
  return createdPercel;
};

const getSinglePercel = async (id: string) => {
  const getSingleParcel = await percel.findById(id);

  if (!getSingleParcel) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not found");
  }
  // console.log("getSingleParcel", getSingleParcel);

  return getSingleParcel;
};
const cancelParcel = async (id: string) => {
  const toCancelParcel = await percel.findById(id);
  // console.log("tocancelParcel", tocancelParcel);

  if (!toCancelParcel) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found for this id");
  }
  if (
    toCancelParcel.parcel_status === "Cancelled" ||
    toCancelParcel.parcel_status === ParcelStatus.Dispatched
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Parcel is already ${toCancelParcel.parcel_status}`
    );
  }

  // otherwise make it cancelled.
  toCancelParcel.parcel_status = ParcelStatus.Cancelled;
  const cancaled = await percel.findByIdAndUpdate(id, toCancelParcel, {
    new: true,
  });
  return cancaled;
};
const getStatusLogPercel = async (id: string) => {
  // console.log("id", id);
  const StatusLogPercel = await percel.findById(id);
  if (!StatusLogPercel) {
    throw new AppError(httpStatus.NOT_FOUND, "Not found");
  }
  return StatusLogPercel;
};


// receiver routes
const getIncomingPercel = async (req: Request) => {
  const token = req.headers.authorization;
  // console.log("token", token);

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "token not found in the request");
  }
  const decodedToken = jwt.decode(token, { complete: true });
  // console.log("decodedToken", decodedToken);

  // only this parcel status data will be in incoming parcels api
  const payload = (decodedToken as JwtPayload)?.payload;
  let query: { [key: string]: unknown } = {
    parcel_status: {
      $in: ["Requested", "Approved", "Dispatched", "In_Transit", "Held"],
    },
  };

  if (payload?.userId) {
    query = {
      ...query,
      receiverId: payload.userId,
    };
  } else if (payload?.email) {
    query = {
      ...query,
      receiver_email: payload.email,
    };
  } else {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "No user identifier found in token."
    );
  }
  // console.log('query', query);
  const getParcels = await percel.find(query);

  if (!getParcels || getParcels?.length === 0) {
    return [];
  }

  return {
    count: getParcels.length,
    Incoming_Parcels: getParcels,
  };
};
const confirmParcel = async (id: string) => {
  const toUpdateParcel = await percel.findById(id);
  // console.log("toUpdateParcel", toUpdateParcel);
  if (!toUpdateParcel) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found for this id");
  }
  if (
    ["Cancelled", "Blocked", "Returned", "Held"].includes(
      toUpdateParcel.parcel_status
    )
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This parcel cannot be confirmed because it is currently marked as "${toUpdateParcel.parcel_status}" now, try again`
    );
  }

  // otherwise make it Delivered to confirm.
  toUpdateParcel.parcel_status = ParcelStatus.Delivered;

  const cancaled = await percel.findByIdAndUpdate(id, toUpdateParcel, {
    new: true,
  });
  return cancaled;
};
const deliveryHistory = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "Access token not found");
  }
  const decodedToken = jwt.decode(token, { complete: true }) as JwtPayload;
  // console.log("decodedToken", decodedToken);
  // const userIdOrMail = decodedToken?.payload.userId ? decodedToken?.payload.userId : decodedToken?.payload.email;

  const getDeliveryHistory = await percel.find({
    receiverId: decodedToken.payload.userId,
    parcel_status: { $ne: "Requested" },
  });
  if (!getDeliveryHistory) {
    throw new AppError(httpStatus.NOT_FOUND, "No parcels are found");
  }

  return getDeliveryHistory;
};


// admin logic
const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};
const getAllParcels = async () => {
  // get users ref table data also from user table that was assigned while creating parcel
  const allParcels = await percel
    .find()
    .populate("senderId", "name role email phone")
    .populate("receiverId", "name role email phone");

  return allParcels;
};

const updateUserRole = async (id: string) => {
  console.log(id);
  const toUpdateUserRole = await User.findById(id);
  // console.log("toUpdateUserRole", toUpdateUserRole);

  if (!toUpdateUserRole) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found for this id");
  }
  if (toUpdateUserRole.role === "ADMIN") {
    throw new AppError(httpStatus.NOT_FOUND, "user already a Admin");
  }

  // set
  toUpdateUserRole.role = Role.ADMIN;
  const updatedUser = await User.findByIdAndUpdate(id, toUpdateUserRole, {
    new: true,
  });

  return updatedUser;
};

const updateUserActiveStatus = async (req: Request) => {
  console.log("req.body", req.body);
  const toUpdateUserisActive = await User.findById(req.body._id);
  console.log("toUpdateUserisActive", toUpdateUserisActive);
  if (!toUpdateUserisActive) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found for this _id");
  }

  // set (isactive/inactive/block) --> user jeta chabe sheta kore dibo
  toUpdateUserisActive.isActive = req.body.isActive;
  const updatedUser = await User.findByIdAndUpdate(req.body._id, toUpdateUserisActive, {
    new: true,
  });
  return updatedUser;
};

export const percelService = {
  createPercel,
  deliveryHistory,
  cancelParcel,
  getStatusLogPercel,
  getIncomingPercel,
  confirmParcel,
  getAllUsers,
  getAllParcels,
  updateUserRole,
  updateUserActiveStatus,
};
