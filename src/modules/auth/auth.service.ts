import AppError from "../../utils/AppError";
import { Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bycryptjs from "bcryptjs";

// create user service(business logic & token/email/password verify)
export const credentailsLogin = async (payload: Partial<Iuser>) => {
  const { email, password } = payload;

  // ai mail diye user already exist kore naki dekhbo thakle err na thakle create new user.
  const isUserExist = await User.findOne({ email });
  console.log("isUserExist", isUserExist);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist");
  }

  // user alreay exist korle match the requested login password with the hashedpassword if matched then go for login
  const isPasswordMatch = await bycryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is Incorrect");
  }

  return {
    email: isUserExist.email,
  };
};

export const AuthCredentailService = {
  credentailsLogin,
};
