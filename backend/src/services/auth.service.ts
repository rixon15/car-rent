import {
  RefreshTokenPayLoad,
  refreshTokenSignOptions,
  verifyToken,
} from "./../utils/jwt";
import jwt, { sign } from "jsonwebtoken";
import VerificationCodeType from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import { APP_ORIGIN, JWT_REFRESH_TOKEN, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { signToken } from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
import { getVerifyEmailTemplate } from "../utils/emailTemplates";

export type CreateAccountParams = {
  email: string;
  password: string;
  phoneNumber: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify user doesn't exist
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  appAssert(!existingUser, CONFLICT, "Email already in use");

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  });

  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/email/verify/${verificationCode}`;
  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });

  if(error) {
    console.log(error)
  }

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sing access token and refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  // return new user and tokens

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  // validate password from request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  // create a session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  //sign acces and refrest tokens
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId });

  //return user and tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payLoad } = verifyToken<RefreshTokenPayLoad>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payLoad, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payLoad.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  // refresh session if it is about to expire in 24 hours for better user experience
  const sessionNeedsRefresh = session.expiresAt.getTime() - now < +ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = session
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  //get verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });

  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
  //get user by id
  //update user to verified true
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
  //delete verification code
  await validCode.deleteOne();
  //return user

  return {
    user: updatedUser.omitPassword(),
  };
};
