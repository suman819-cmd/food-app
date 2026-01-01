// import api from "./api";

// /* ================= TYPES ================= */

// export interface SignupPayload {
//   username: string;
//   email: string;
//   password: string;
//   phone?: string;
// }

// /* ================= AUTH REQUESTS ================= */

// export const signupRequest = async (payload: SignupPayload) => {
//   const res = await api.post("/auth/signup", payload);
//   return res.data;
// };

// export const loginRequest = async (email: string, password: string) => {
//   const res = await api.post("/auth/login", { email, password });
//   return res.data;
// };

// export const meRequest = async () => {
//   const res = await api.get("/auth/me");
//   return res.data;
// };

// export const logoutRequest = async () => {
//   const res = await api.post("/auth/logout");
//   return res.data;
// };

// /* ================= FORGOT PASSWORD ================= */

// export const forgotPasswordRequest = async (email: string) => {
//   const res = await api.post("/auth/forgot-password", { email });
//   return res.data;
// };

// /* ================= VERIFY RESET CODE ================= */

// export const verifyResetCodeRequest = async (
//   email: string,
//   verificationCode: string
// ) => {
//   const res = await api.post("/auth/verify-otp", {
//     email,
//     verificationCode,
//   });
//   return res.data;
// };

// /* ================= RESET PASSWORD ================= */

// export const resetPasswordRequest = async (
//   email: string,
//   verificationCode: string,
//   password: string
// ) => {
//   const res = await api.post("/auth/reset-password", {
//     email,
//     verificationCode,
//     password,
//   });
//   return res.data;
// };

// /* ================= OBJECT STYLE EXPORT ================= */
// /* This allows you to call functions as: authService.resetPasswordRequest(...) */

// export const authService = {
//   signupRequest,
//   loginRequest,
//   meRequest,
//   logoutRequest,
//   forgotPasswordRequest,
//   verifyResetCodeRequest,
//   resetPasswordRequest,
// };

// /* ================= DEFAULT EXPORTS ================= */
// /* This allows individual imports like: import { loginRequest } from '@/app/services/auth.service' */

// export default authService;
import api from "./api";

/* ================= TYPES ================= */

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

/* ================= AUTH REQUESTS ================= */

export const signupRequest = async (payload: SignupPayload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const meRequest = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

/* ================= FORGOT PASSWORD ================= */

export const forgotPasswordRequest = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

/* ================= VERIFY RESET CODE ================= */
// ✅ Changed verificationCode -> otp to match backend
export const verifyResetCodeRequest = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", {
    email,
    otp, // now matches backend
  });
  return res.data;
};

/* ================= RESET PASSWORD ================= */
// ✅ Also changed verificationCode -> otp
export const resetPasswordRequest = async (
  email: string,
  otp: string,
  password: string
) => {
  const res = await api.post("/auth/reset-password", {
    email,
    otp,
    password,
  });
  return res.data;
};

/* ================= OBJECT STYLE EXPORT ================= */
export const authService = {
  signupRequest,
  loginRequest,
  meRequest,
  logoutRequest,
  forgotPasswordRequest,
  verifyResetCodeRequest,
  resetPasswordRequest,
};

/* ================= DEFAULT EXPORT ================= */
export default authService;
