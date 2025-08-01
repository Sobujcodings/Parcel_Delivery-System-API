import { model, Schema } from "mongoose";
import { Iuser, Role, IsActive } from "./user.interface";
import { boolean } from "zod";

// use this schema to the userSchema
const authProviderSchema = new Schema(
  {
    provider: { type: String, require: true },
    providerId: { type: String, require: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

// user Schema of model
const userSchema = new Schema<Iuser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.SENDER,
    },
    phone: { type: String},
    picture: { type: String },
    adress: { type: String },
    isDeleted: { type: String },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: boolean, default: false },
    // jehetu koyek upay e login/reg korte pare ba google diye korar por o mail diye korte pare tai ata akta array hobe mulple auth info thakbe user r
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// the model (which is the main thing to talk to the database)
export const User = model<Iuser>("User", userSchema);
