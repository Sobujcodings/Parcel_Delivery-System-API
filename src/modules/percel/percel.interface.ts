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
  phone: string;
  
  sender_email : string,
  receiver_email : string,

  fromAddress: string;
  toAddress: string;

  // Ref to User
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId | null;

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

  statusLog: trackingEvents[];

  createdAt?: Date;
  updatedAt?: Date;
}
