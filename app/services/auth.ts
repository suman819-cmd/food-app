import API from "./api";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Signup
export const signup = async (data: SignupData) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

// Login
export const login = async (data: LoginData) => {
  const res = await API.post("/auth/login", data);
  return res.data; // { token, user }
};

// Get current user
export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

// OTP functions
export const sendOtp = async (
  email: string,
  purpose: "VERIFICATION" | "RESET_PASSWORD"
) => {
  return await API.post("/auth/send-otp", { email, purpose });
};

export const verifyOtp = async (
  email: string,
  otp: string,
  purpose: "VERIFICATION" | "RESET_PASSWORD"
) => {
  return await API.post("/auth/verify-otp", { email, otp, purpose });
};

export const resendOtp = async (
  email: string,
  purpose: "VERIFICATION" | "RESET_PASSWORD"
) => {
  return await API.post("/auth/resend-otp", { email, purpose });
};

// Password reset
export const requestPasswordReset = async (email: string) => {
  return await API.post("/auth/request-password-reset", { email });
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  return await API.post("/auth/reset-password", { email, otp, newPassword });
};
