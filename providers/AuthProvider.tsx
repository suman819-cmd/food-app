import {
  loginRequest,
  logoutRequest,
  meRequest,
  SignupPayload,
  signupRequest,
} from "@/app/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (data: SignupPayload) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const data = await meRequest();
        setUser(data.user);
      } catch {
        await AsyncStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signup = async (data: SignupPayload) => {
    await signupRequest(data);

    // Pass email to verify-code screen
    router.push({
      pathname: "/(auth)/verify-code",
      params: { email: data.email },
    });
  };

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    await AsyncStorage.setItem("token", data.token);
    setUser(data.user);
    router.replace("/(tabs)/(home)");
  };

  const logout = async () => {
    await logoutRequest();
    await AsyncStorage.removeItem("token");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Named export for hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
