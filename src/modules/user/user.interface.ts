import { Types } from "mongoose";

// enum e nam dilam ata tar value dilam ata
export enum Role {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export interface IAuthProvider {
  provider: "goggle" | "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface Iuser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  adress?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  // this authprovider might be multiple, from googgle, gmail login
  // user might have multiple bookings (booking id represent that booking)
  // bookings?: Types.ObjectId[];
  // guide?: Types.ObjectId[];
}
