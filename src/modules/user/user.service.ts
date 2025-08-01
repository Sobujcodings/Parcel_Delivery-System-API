/* eslint-disable @typescript-eslint/no-unused-vars */
// this user has partial attr of model user
// it might have multiple service, so wrap it in a obj

import AppError from "../../utils/AppError";
import { IAuthProvider, Iuser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bycryptjs from "bcryptjs";

// create user service(business logic)
export const createUser = async (payload: Partial<Iuser>) => {
  const { email, password, ...rest } = payload;

  // ai mail diye user already exist kore naki dekhbo thakle err na thakle create new user.
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  // hash the password then send it to the database (when password matching is needed match this using bycript also) -> 10 means kotobar hash hobe   // if we need to match this in further checking true/false
  const hashedPassword = await bycryptjs.hash(password as string, 10);

  // ai user create r sathe authprovider keo padhiye dilam (amra jani ekhane ata google na direct credentials diye kortechi tai credenditals boshiye dilam)
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  // email to thakbei alada kore nilam + baki shob ...rest padhabo, r auth k ekhan theke define kore padhiye dilam
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

// Get user API
export const getUser = async () => {
  const user = await User.find({});

  // for meta data
  const totalUsers = await User.countDocuments();

  return {
    data: user,
    meta: {
      total: totalUsers,
    },
  };
};

// export
export const UserServices = {
  createUser,
  getUser,
};
