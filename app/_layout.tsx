import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native'; // ✅ Import from react-native
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/providers/AppProvider";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { DeliveryProvider } from "@/providers/DeliveryProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const ONBOARDING_KEY = 'has_seen_onboarding';

// ErrorBoundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('🔴 ERROR CAUGHT:', error);
    console.log('📋 Error Stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Error Details:</Text>
          <Text style={{ fontSize: 14, textAlign: 'center' }}>
            {this.state.error?.toString()}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // ⚠️ TEMPORARY: Reset for testing - REMOVE THIS IN PRODUCTION ⚠️
      await AsyncStorage.removeItem('has_seen_onboarding');
      await AsyncStorage.removeItem('user');
      console.log('🧹 Cleared onboarding and user data for testing');
      // ⚠️ REMOVE THE ABOVE LINES IN PRODUCTION ⚠️
      
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      console.log('🔍 Onboarding status:', value);
      setHasSeenOnboarding(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasSeenOnboarding(false);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setHasSeenOnboarding(true);
      console.log('✅ Onboarding completed');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  // ✅ FIXED: Return a proper loading view
  if (!appIsReady || isLoading || hasSeenOnboarding === null) {
    console.log('⏳ Loading: appIsReady=', appIsReady, 'isLoading=', isLoading, 'hasSeenOnboarding=', hasSeenOnboarding);
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
    );
  }

  console.log('🎯 Rendering flow:', { 
    hasSeenOnboarding, 
    user: !!user,
    userEmail: user?.email 
  });

  // Show onboarding if user hasn't seen it
  if (!hasSeenOnboarding) {
    console.log('🎬 Showing onboarding flow');
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen 
          name="onboarding" 
          listeners={{
            transitionEnd: ({ data }) => {
              if (!data.closing) {
                completeOnboarding();
              }
            },
          }}
        />
      </Stack>
    );
  }

  // Show auth flow if user is not logged in
  if (!user) {
    console.log('🔐 Showing auth flow - user not logged in');
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }

  // Show main app if user is logged in and has seen onboarding
  console.log('🏠 Showing main app - user is logged in');
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      
      {/* Modal Screens */}
      <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
      <Stack.Screen name="helpsupport" options={{ presentation: 'modal' }} />
      <Stack.Screen name="wallet" options={{ presentation: 'modal' }} />
      <Stack.Screen name="refer-earn" options={{ presentation: 'modal' }} />
      <Stack.Screen name="my-address" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
      <Stack.Screen name="coupons" options={{ presentation: 'modal' }} />
      <Stack.Screen name="loyalty" options={{ presentation: 'modal' }} />
      <Stack.Screen name="terms-conditions" options={{ presentation: 'modal' }} />
      
      {/* Delivery Tracking Screens */}
      <Stack.Screen name="tracking" options={{ presentation: 'modal' }} />
      
      {/* Other screens */}
      <Stack.Screen name="search-results" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="cancellation-policy" />
      <Stack.Screen name="shipping-policy" />
      <Stack.Screen name="add-address" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <DeliveryProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
            </GestureHandlerRootView>
          </DeliveryProvider>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}