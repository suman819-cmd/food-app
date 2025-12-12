// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   phone: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
//   logout: () => void;
//   updateUser: (userData: Partial<User>) => Promise<void>;
//   isLoading: boolean;
//   isUpdating: boolean; // Separate state for update operations
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false); // Separate loading state for updates
//   const router = useRouter();

//   // Check if user is logged in on app start
//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       console.log('🔐 Checking authentication state...');
      
//       // Check if user exists in AsyncStorage
//       const userData = await AsyncStorage.getItem('user');
      
//       if (userData) {
//         console.log('✅ User found in storage, auto-login');
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } else {
//         console.log('❌ No user found in storage, showing auth flow');
//         setUser(null);
//       }
      
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error checking auth state:', error);
//       setUser(null);
//       setIsLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       console.log('🔐 Attempting login for:', email);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Validate credentials (in real app, this would be an API call)
//       if (!email || !password) {
//         throw new Error('Please enter both email and password');
//       }

//       if (password.length < 6) {
//         throw new Error('Password must be at least 6 characters');
//       }
      
//       const mockUser: User = {
//         id: '1',
//         fullName: 'Suman Bashyal',
//         email: email,
//         phone: '+977 | 9744318379',
//       };
      
//       // Save user to AsyncStorage
//       await AsyncStorage.setItem('user', JSON.stringify(mockUser));
//       setUser(mockUser);
      
//       console.log('✅ Login successful, redirecting to home');
//       // Redirect to home screen within tabs
//       router.replace('/(tabs)/(home)');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw new Error('Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
//     setIsLoading(true);
//     try {
//       console.log('🔐 Attempting signup for:', userData.email);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Validate input
//       if (!userData.fullName || !userData.email || !userData.password) {
//         throw new Error('Please fill all required fields');
//       }

//       if (userData.password.length < 6) {
//         throw new Error('Password must be at least 6 characters');
//       }
      
//       const newUser: User = {
//         id: Math.random().toString(36).substr(2, 9),
//         fullName: userData.fullName,
//         email: userData.email,
//         phone: userData.phone || '+977 | 9744318379',
//       };
      
//       // Save user to AsyncStorage
//       await AsyncStorage.setItem('user', JSON.stringify(newUser));
//       setUser(newUser);
      
//       console.log('✅ Signup successful, redirecting to home');
//       // Redirect to home screen within tabs
//       router.replace('/(tabs)/(home)');
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw new Error('Signup failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateUser = async (userData: Partial<User>) => {
//     setIsUpdating(true); // Use separate updating state instead of isLoading
//     try {
//       console.log('🔄 Updating user profile...');
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (!user) {
//         throw new Error('No user found');
//       }

//       // Validate required fields
//       if (userData.fullName && !userData.fullName.trim()) {
//         throw new Error('Name is required');
//       }

//       if (userData.email && !userData.email.trim()) {
//         throw new Error('Email is required');
//       }

//       // Email validation
//       if (userData.email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(userData.email)) {
//           throw new Error('Please enter a valid email address');
//         }
//       }

//       // Update user data
//       const updatedUser: User = {
//         ...user,
//         ...userData,
//       };

//       // Update both state and AsyncStorage
//       setUser(updatedUser);
//       await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

//       console.log('✅ Profile updated successfully');
      
//     } catch (error) {
//       console.error('Update user error:', error);
//       if (error instanceof Error) {
//         throw error;
//       } else {
//         throw new Error('Failed to update profile. Please try again.');
//       }
//     } finally {
//       setIsUpdating(false); // Use separate updating state
//     }
//   };

//   const logout = async () => {
//     setIsLoading(true);
//     try {
//       console.log('🔐 Logging out...');
      
//       // Simulate API call for logout if needed
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       // Remove user from AsyncStorage and state
//       await AsyncStorage.removeItem('user');
//       setUser(null);
      
//       console.log('✅ Logout successful, redirecting to login');
//       // Redirect to login screen
//       router.replace('/(auth)/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       throw new Error('Logout failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       signup, 
//       logout, 
//       updateUser, 
//       isLoading,
//       isUpdating // Export the separate updating state
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }




















import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isUpdating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!email || !password || password.length < 6) throw new Error('Invalid credentials');

      const mockUser: User = {
        id: '1',
        fullName: 'Suman Bashyal',
        email,
        phone: '+977 | 9744318379',
      };

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      router.replace('/(tabs)/(home)');
    } catch (error) {
      throw new Error((error as Error).message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!userData.fullName || !userData.email || !userData.password || userData.password.length < 6) {
        throw new Error('Please fill all required fields');
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone || '+977 | 9744318379',
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      router.replace('/(tabs)/(home)');
    } catch (error) {
      throw new Error((error as Error).message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    setIsUpdating(true);
    try {
      if (!user) throw new Error('No user found');

      const updatedUser: User = { ...user, ...userData };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error((error as Error).message || 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      throw new Error((error as Error).message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading, isUpdating }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
