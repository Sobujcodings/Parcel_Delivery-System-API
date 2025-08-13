import AppError from "../../utils/AppError";
import { IsActive, Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bycryptjs from "bcryptjs";
import { generateToken, VerifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createUserTokens, createNewAccessTokenWithRefreshToken } from '../../utils/userTokens';
import { JwtPayload } from "jsonwebtoken";

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

  const userTokens = createUserTokens(isUserExist);

  // remove password
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

export const getNewAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No refresh token is found from cookies");
  }
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};

export const AuthCredentailService = {
  credentailsLogin,
  getNewAccessToken,
};
