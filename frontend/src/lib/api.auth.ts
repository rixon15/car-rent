import API from "../config/apiClient";

interface IresetPassword {
  verificationCode: string;
  password: string;
}

export const login = async (data: { email: string; password: string }) => {
  await API.post("/auth/login", data);
};

export const register = async (data: {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}) => {
  await API.post("/auth/register", data);
};

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
