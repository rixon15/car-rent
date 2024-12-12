import API from "../config/apiClient";

interface IresetPassword {
  verificationCode: string;
  password: string;
}

export const verifyEmail = async (verificationCode: string) => {
  return await API.get(`/auth/email/verify/${verificationCode}`);
};

export const sendPasswordResetEmail = async (email: string) => {
  return await API.post("/auth/password/forgot", { email });
};

export const resetPassword = async ({
  verificationCode,
  password,
}: IresetPassword) => {
  return await API.post("/auth/password/reset", { verificationCode, password });
};
