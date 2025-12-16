import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../app/services/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const data = await authService.getMe();
          setUser(data.user);
        } catch {
          await AsyncStorage.removeItem("token");
        }
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    await AsyncStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await authService.signup(data);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
