import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import Colors from '@/constants/color';

// Use Expo Icons instead of lucide-react-native
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    // Clear confirm password error when either password field changes
    if ((field === 'password' || field === 'confirmPassword') && errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: '' });
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

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({ ...errors, general: '' });
    startButtonAnimation();

    try {
      // Simulate 2 seconds loading before actual signup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: '' // Add phone if needed
      });
      // Signup successful - AuthProvider will handle navigation
      
    } catch (error: any) {
      // Stop animations on error
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      
      // Set general error message below the button
      setErrors({ ...errors, general: error.message || 'Failed to create account' });
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
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Full Name</Text>
            <View style={[
              styles.inputContainer, 
              errors.fullName && styles.inputContainerError
            ]}>
              <Ionicons 
                name="person-outline" 
                size={20} 
                color={errors.fullName ? Colors.error : Colors.gray} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.gray}
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
                editable={!loading}
              />
            </View>
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
          </View>

          {/* Email Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email</Text>
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
                editable={!loading}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Password Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Password</Text>
            <View style={[
              styles.inputContainer, 
              errors.password && styles.inputContainerError
            ]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={errors.password ? Colors.error : Colors.gray} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.gray}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? (
                  <Ionicons name="eye-off-outline" size={20} color={errors.password ? Colors.error : Colors.gray} />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={errors.password ? Colors.error : Colors.gray} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={[
              styles.inputContainer, 
              errors.confirmPassword && styles.inputContainerError
            ]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={errors.confirmPassword ? Colors.error : Colors.gray} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor={Colors.gray}
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <Ionicons name="eye-off-outline" size={20} color={errors.confirmPassword ? Colors.error : Colors.gray} />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={errors.confirmPassword ? Colors.error : Colors.gray} />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          {/* Signup Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.signupButton, loading && styles.signupButtonDisabled]} 
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                    <ActivityIndicator size="small" color={Colors.white} />
                  </Animated.View>
                  <Text style={styles.signupButtonText}>Creating Account...</Text>
                </View>
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* General Error Message */}
          {errors.general ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.generalErrorText}>{errors.general}</Text>
            </View>
          ) : null}

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(auth)/login')}
              disabled={loading}
            >
              <Text style={[styles.loginLink, loading && styles.disabledLink]}>Login</Text>
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
  form: {
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
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
  eyeButton: {
    padding: 4,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 54,
    justifyContent: 'center',
  },
  signupButtonDisabled: {
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
  signupButtonText: {
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
  },
  generalErrorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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