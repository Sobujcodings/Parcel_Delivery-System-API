import { model, Schema, Types } from "mongoose";
import { Ipercel, trackingEvents, ParcelStatus } from "./percel.interface";

export const statuslogs = new Schema<trackingEvents>(
  {
    location: { type: String },
    timestamp: { type: Date },
    status: { type: String },
    note: { type: String },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export const percelSchema = new Schema<Ipercel>(
  {
    trackingId: { type: String },

    phone: { type: String, required: true },
    email: { type: String, required: true },

    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // receiver: { type: Schema.Types.ObjectId, ref: "user", required: true },

    fromAddress: { type: String, required: true },
    toAddress: { type: String, required: true },
    parcelType: { type: String },

    weight: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },

    isCancelled: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isReturned: { type: Boolean, default: false },
    isHeld: { type: Boolean, default: false },
    isFragile: { type: Boolean, default: false },
    delivery_date: { type: Date },

    parcel_status: {
      type: String,
      enum: Object.values(ParcelStatus),
      default: ParcelStatus.Requested,
    },
    trackingEvents: [statuslogs],

    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const percel = model<Ipercel>("Percel", percelSchema);
