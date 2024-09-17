import VerificationCodeType from "../constants/verificationCodeTypes";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";

export type createAccountParams = {
  email: string;
  password: string;
  phoneNumber: string;
  userAgent?: string;
};

export const createAccount = async (data: createAccountParams) => {
  // verify user doesn't exist
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type:VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  })

  // send verification email


  // create session


  // sing access token and refresh token
  // return new user and tokens
};
