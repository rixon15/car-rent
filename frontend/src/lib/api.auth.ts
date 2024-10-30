import API from "../config/apiClient";

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

export const verifyEmail = async (verificationCode) => {
  API.get(`/auth/email/verify/${verificationCode}`);
};
