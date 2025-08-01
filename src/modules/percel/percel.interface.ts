import { Types } from "mongoose";

export enum ParcelStatus {
  Requested = "Requested",
  Approved = "Approved",
  Dispatched = "Dispatched",
  In_Transit = "In_Transit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Returned = "Returned",
  Held = "Held",
  Blocked = "Blocked",
}

export interface trackingEvents {
  location: string;
  timestamp: Date;
  status: string;
  note?: string;
}

export interface Ipercel {
  trackingId?: string;
  email: string;
  phone: string;

  fromAddress: string;
  toAddress: string;

  // Ref to User
  sender: Types.ObjectId;
  receiver?: Types.ObjectId;

  parcelType?: string;
  isFragile?: boolean;
  weight: number;

  deliveryFee: number;
  delivery_date?: Date;

  parcel_status: ParcelStatus;

  isCancelled?: boolean;
  isBlocked?: boolean;
  isReturned?: boolean;
  isHeld?: boolean;

  trackingEvents: trackingEvents[];

  createdAt?: Date;
  updatedAt?: Date;
}
