import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { JWT_REFRESH_TOKEN, JWT_SECRET } from "../constants/env";

export type RefreshTokenPayLoad = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayLoad = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_TOKEN,
};

export const signToken = (
  payload: AccessTokenPayLoad | RefreshTokenPayLoad,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOptions } = options || accessTokenSignOptions;

  return jwt.sign(payload, secret, { ...defaults, ...signOptions });
};

export const verifyToken =<TPayLoad extends object = AccessTokenPayLoad> (
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = JWT_SECRET, ...verifyOptions } = options || {};

  try {
    const payLoad = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOptions,
    }) as TPayLoad;

    return { payLoad };
  } catch (error: any) {
    return { error: error.message };
  }
};
