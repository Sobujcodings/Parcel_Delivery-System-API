import AppError from "../../utils/AppError";
import { Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bycryptjs from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

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

  // jwt payload
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
    isActive: isUserExist.isActive,
  };

  // accessToken assign
  // const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "1d" });
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return {
    accessToken,
  };
};

export const AuthCredentailService = {
  credentailsLogin,
};
