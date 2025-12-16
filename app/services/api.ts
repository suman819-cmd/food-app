import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ⚠️ CHANGE THIS TO YOUR PC IP
const BASE_URL = "http://192.168.0.102:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
