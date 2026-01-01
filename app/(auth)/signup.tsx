import Colors from "@/constants/color";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    general: "",
  });

  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      general: "",
    };

    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Full name is required";
      isValid = false;
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Full name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const startButtonAnimation = () => {
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

    Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({ ...errors, general: "" });
    startButtonAnimation();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: "",
      });
    } catch (error: any) {
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);

      setErrors({
        ...errors,
        general: error.message || "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  const spin = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Full Name</Text>
            <View style={[styles.inputContainer, errors.username && styles.inputContainerError]}>
              <Ionicons name="person-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.gray}
                value={formData.username}
                onChangeText={(t) => handleInputChange("username", t)}
              />
            </View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
              <Ionicons name="mail-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors.gray}
                value={formData.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(t) => handleInputChange("email", t)}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputContainerError]}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.gray}
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(t) => handleInputChange("password", t)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <ActivityIndicator color={Colors.white} />
                  </Animated.View>
                  <Text style={styles.signupButtonText}>Creating Account...</Text>
                </View>
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {errors.general && (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.generalErrorText}>{errors.general}</Text>
            </View>
          )}

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  backButton: { padding: 8 },
  title: { fontSize: 20, fontWeight: "bold", color: Colors.black },
  placeholder: { width: 40 },
  form: { padding: 20 },
  inputSection: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputContainerError: { borderColor: Colors.error },
  input: { flex: 1, paddingVertical: 14, fontSize: 16 },
  signupButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  signupButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  errorText: { color: Colors.error, fontSize: 14, marginTop: 4 },
  generalErrorContainer: {
    backgroundColor: Colors.error + "20",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  generalErrorText: { color: Colors.error },
  loginContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  loginText: { color: Colors.gray },
  loginLink: { color: Colors.primary, fontWeight: "bold" },
  loadingContainer: { flexDirection: "row", gap: 10 },
});
