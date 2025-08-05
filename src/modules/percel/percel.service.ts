/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { Request } from "express";
import AppError from "../../utils/AppError";
import { User } from "../user/user.model";
import { Ipercel, ParcelStatus } from "./percel.interface";
import { percel } from "./percel.model";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  }
  const decoded = jwt.decode(token, { complete: true });
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
  if (toCancelParcel.parcel_status === "Cancelled") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Parcel is already Cancelled"
    );
  }
  if (toCancelParcel.parcel_status === ParcelStatus.Dispatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found, Its dispatced");
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
      `This parcel cannot be confirmed because it is currently marked as "${toUpdateParcel.parcel_status}".`
    );
  }

  // otherwise make it Delivered to confirm.
  toUpdateParcel.parcel_status = ParcelStatus.Delivered;

  const cancaled = await percel.findByIdAndUpdate(id, toUpdateParcel, {
    new: true,
  });
  return cancaled;
};

export const percelService = {
  createPercel,
  getSinglePercel,
  cancelParcel,
  getStatusLogPercel,
  getIncomingPercel,
  confirmParcel,
};
