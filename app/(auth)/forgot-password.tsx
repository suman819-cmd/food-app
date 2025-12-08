import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/app/services/auth.service';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    general: ''
  });

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {
      email: '',
      general: ''
    };

    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const startButtonAnimation = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Spinner rotation animation
    Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({ ...errors, general: '' });
    startButtonAnimation();

    try {
      // Call your backend API
      await authService.forgotPassword(formData.email);
      
      // Success - navigate to code verification screen
      router.push({
        pathname: '/(auth)/reset-code',
        params: { email: formData.email }
      });
      
    } catch (error: any) {
      // Stop animations on error
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      
      // Handle specific error messages
      const errorMessage = error.message || 'Failed to send reset link. Please try again.';
      setErrors({ ...errors, general: errorMessage });
      
      // You can also show an alert
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Spinner rotation interpolation
  const spin = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Ionicons 
            name="lock-closed-outline" 
            size={80} 
            color={Colors.primary} 
            style={styles.lockIcon} 
          />
          
          <Text style={styles.description}>
            Enter your email address and we'll send you a verification code to reset your password.
          </Text>

          {/* Email Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[
              styles.inputContainer, 
              errors.email && styles.inputContainerError
            ]}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={errors.email ? Colors.error : Colors.gray} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors.gray}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Reset Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.resetButton, loading && styles.resetButtonDisabled]} 
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                    <ActivityIndicator size="small" color={Colors.white} />
                  </Animated.View>
                  <Text style={styles.resetButtonText}>Sending Code...</Text>
                </View>
              ) : (
                <Text style={styles.resetButtonText}>Send Verification Code</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* General Error Message */}
          {errors.general ? (
            <View style={styles.generalErrorContainer}>
              <Ionicons name="alert-circle-outline" size={18} color={Colors.error} />
              <Text style={styles.generalErrorText}>{errors.general}</Text>
            </View>
          ) : null}

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(auth)/login')}
              disabled={loading}
            >
              <Text style={[styles.loginLink, loading && styles.disabledLink]}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  lockIcon: {
    marginTop: 40,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputSection: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.black,
  },
  resetButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    minHeight: 54,
    justifyContent: 'center',
    marginTop: 8,
  },
  resetButtonDisabled: {
    backgroundColor: Colors.primary,
    opacity: 0.8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  spinner: {
    width: 20,
    height: 20,
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  generalErrorContainer: {
    backgroundColor: Colors.error + '20',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  generalErrorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  loginText: {
    color: Colors.gray,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledLink: {
    opacity: 0.5,
  },
});