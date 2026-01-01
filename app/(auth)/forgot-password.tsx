import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Animated, ActivityIndicator, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/app/services/auth.service';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validateEmail = () => {
    if (!email.trim()) { setError('Email is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email'); return false; }
    setError(''); return true;
  };

  const startButtonAnimation = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.timing(spinnerRotation, { toValue: 1, duration: 1000, useNativeDriver: true })
    ).start();
  };

  const handleResetRequest = async () => {
    if (!validateEmail()) return;

    setLoading(true);
    startButtonAnimation();

    try {
      await authService.forgotPasswordRequest(email);

      // Navigate to Reset Code screen
      router.push({
        pathname: '/(auth)/reset-code',
        params: { email },
      });

    } catch (err: any) {
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      const message = err?.message || 'Failed to send verification code';
      setError(message);
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const spin = spinnerRotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Ionicons name="lock-closed-outline" size={80} color={Colors.primary} style={styles.icon} />
          <Text style={styles.description}>Enter your email to receive a verification code.</Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, error && styles.inputContainerError]}>
              <Ionicons name="mail-outline" size={20} color={error ? Colors.error : Colors.gray} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors.gray}
                value={email}
                onChangeText={(text) => { setEmail(text); if (error) setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleResetRequest}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <ActivityIndicator size="small" color={Colors.white} />
                  </Animated.View>
                  <Text style={styles.buttonText}>Sending...</Text>
                </View>
              ) : <Text style={styles.buttonText}>Send Verification Code</Text>}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { flexGrow: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.borderGray },
  backButton: { padding: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.black },
  placeholder: { width: 40 },
  content: { padding: 20, alignItems: 'center' },
  icon: { marginTop: 40, marginBottom: 24 },
  description: { fontSize: 16, color: Colors.gray, textAlign: 'center', marginBottom: 32, lineHeight: 24 },
  inputSection: { width: '100%', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.black, marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.borderGray, borderRadius: 8, paddingHorizontal: 12 },
  inputContainerError: { borderColor: Colors.error },
  input: { flex: 1, paddingVertical: 14, fontSize: 16 },
  button: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.8 },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  errorText: { color: Colors.error, marginTop: 4 },
});
