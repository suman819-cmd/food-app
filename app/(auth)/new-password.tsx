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
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/app/services/auth.service';

export default function NewPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string || '';
  const verificationCode = params.verificationCode as string || '';
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    general: ''
  });

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {
      password: '',
      confirmPassword: '',
      general: ''
    };

    let isValid = true;

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

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({ ...errors, general: '' });
    startButtonAnimation();

    try {
      // Call your backend API to reset password
      await authService.resetPassword(
        email,
        verificationCode,
        formData.password
      );
      
      // Success - show alert and redirect to login
      Alert.alert(
        'Success',
        'Your password has been reset successfully! You can now login with your new password.',
        [
          {
            text: 'Go to Login',
            onPress: () => {
              router.replace('/(auth)/login');
            }
          }
        ]
      );
      
    } catch (error: any) {
      // Stop animations on error
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      
      // Handle specific error messages
      const errorMessage = error.message || 'Failed to reset password. Please try again.';
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

  // Check password strength
  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = [
    Colors.error,
    Colors.error,
    Colors.warning || '#FF9500',
    Colors.success,
  ];

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
          <Text style={styles.title}>New Password</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Ionicons 
            name="key-outline" 
            size={80} 
            color={Colors.primary} 
            style={styles.keyIcon} 
          />
          
          <Text style={styles.description}>
            Create a new strong password for your account
          </Text>

          {/* New Password Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>New Password</Text>
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
                placeholder="Enter new password"
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

          {/* Password Strength Indicator */}
          {formData.password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthLabels}>
                <Text style={styles.strengthLabel}>Weak</Text>
                <Text style={styles.strengthLabel}>Fair</Text>
                <Text style={styles.strengthLabel}>Good</Text>
                <Text style={styles.strengthLabel}>Strong</Text>
              </View>
              <View style={styles.strengthBarContainer}>
                {[0, 1, 2, 3].map((index) => (
                  <View 
                    key={index}
                    style={[
                      styles.strengthBar,
                      index < passwordStrength && {
                        backgroundColor: strengthColors[passwordStrength - 1],
                      }
                    ]}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Confirm Password Field */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Confirm New Password</Text>
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
                placeholder="Confirm new password"
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

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <View style={styles.requirementItem}>
              <Ionicons 
                name={formData.password.length >= 6 ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={formData.password.length >= 6 ? Colors.success : Colors.gray} 
              />
              <Text style={[
                styles.requirementText,
                formData.password.length >= 6 && styles.requirementTextMet
              ]}>
                At least 6 characters
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <Ionicons 
                name={/[A-Z]/.test(formData.password) ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={/[A-Z]/.test(formData.password) ? Colors.success : Colors.gray} 
              />
              <Text style={[
                styles.requirementText,
                /[A-Z]/.test(formData.password) && styles.requirementTextMet
              ]}>
                One uppercase letter
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <Ionicons 
                name={/[0-9]/.test(formData.password) ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={/[0-9]/.test(formData.password) ? Colors.success : Colors.gray} 
              />
              <Text style={[
                styles.requirementText,
                /[0-9]/.test(formData.password) && styles.requirementTextMet
              ]}>
                One number
              </Text>
            </View>
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
                  <Text style={styles.resetButtonText}>Resetting Password...</Text>
                </View>
              ) : (
                <Text style={styles.resetButtonText}>Reset Password</Text>
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
            <Text style={styles.loginText}>Remembered your password? </Text>
            <TouchableOpacity 
              onPress={() => router.replace('/(auth)/login')}
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
  keyIcon: {
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
  strengthContainer: {
    width: '100%',
    marginBottom: 24,
  },
  strengthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  strengthLabel: {
    fontSize: 12,
    color: Colors.gray,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    gap: 4,
    height: 4,
  },
  strengthBar: {
    flex: 1,
    backgroundColor: Colors.borderGray,
    borderRadius: 2,
  },
  requirementsContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: Colors.gray,
  },
  requirementTextMet: {
    color: Colors.success,
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