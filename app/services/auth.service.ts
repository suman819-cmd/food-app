import api from "./api";

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

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

