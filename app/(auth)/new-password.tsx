import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Animated, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/app/services/auth.service';

export default function NewPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || '';
  const verificationCode = (params.verificationCode as string) || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  const validatePasswords = () => {
    if (!password.trim() || !confirmPassword.trim()) { setError('Fill out all fields'); return false; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return false; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return false; }
    setError(''); return true;
  };

  const startButtonAnimation = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.timing(spinnerRotation, { toValue: 1, duration: 1000, useNativeDriver: true })).start();
  };

  const handleResetPassword = async () => {
    if (!validatePasswords()) return;
    if (!email || !verificationCode) { Alert.alert('Error','Missing email or code'); return; }

    setLoading(true);
    startButtonAnimation();

    try {
      await authService.resetPasswordRequest(email, verificationCode, password);
      Alert.alert('Success', 'Password reset successfully');
      router.push('/(auth)/login');
    } catch (err: any) {
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      setError(err.message || 'Failed to reset password');
    } finally { setLoading(false); }
  };

  const spin = spinnerRotation.interpolate({ inputRange: [0,1], outputRange: ['0deg','360deg'] });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={Colors.black}/>
          </TouchableOpacity>
          <Text style={styles.title}>New Password</Text>
          <View style={styles.placeholder}/>
        </View>

        <View style={styles.content}>
          <Ionicons name="lock-closed-outline" size={80} color={Colors.primary} style={styles.icon}/>
          <Text style={styles.description}>Set your new password for {email}</Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>New Password</Text>
            <TextInput style={styles.input} secureTextEntry placeholder="Enter new password" value={password} onChangeText={setPassword} editable={!loading}/>
          </View>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput style={styles.input} secureTextEntry placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} editable={!loading}/>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Animated.View style={{transform:[{scale:buttonScale}]}}>
            <TouchableOpacity style={[styles.button, loading&&styles.buttonDisabled]} onPress={handleResetPassword} disabled={loading}>
              {loading?(
                <View style={styles.loadingContainer}>
                  <Animated.View style={{transform:[{rotate:spin}]}}>
                    <ActivityIndicator size="small" color={Colors.white}/>
                  </Animated.View>
                  <Text style={styles.buttonText}>Resetting...</Text>
                </View>
              ):<Text style={styles.buttonText}>Reset Password</Text>}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:Colors.white}, scrollContent:{flexGrow:1},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20,borderBottomWidth:1,borderBottomColor:Colors.borderGray},
  backButton:{padding:8}, title:{fontSize:20,fontWeight:'bold',color:Colors.black}, placeholder:{width:40},
  content:{padding:20,alignItems:'center'},
  icon:{marginTop:40,marginBottom:24}, description:{fontSize:16,color:Colors.gray,textAlign:'center',marginBottom:32,lineHeight:24},
  inputSection:{width:'100%',marginBottom:16},
  label:{fontSize:16,fontWeight:'600',color:Colors.black,marginBottom:6},
  input:{borderWidth:1,borderColor:Colors.borderGray,borderRadius:8,paddingHorizontal:12,paddingVertical:14,fontSize:16},
  button:{backgroundColor:Colors.primary,paddingVertical:16,borderRadius:8,alignItems:'center',marginTop:8},
  buttonDisabled:{opacity:0.8}, buttonText:{color:Colors.white,fontSize:16,fontWeight:'bold'},
  loadingContainer:{flexDirection:'row',alignItems:'center',gap:12},
  errorText:{color:Colors.error,fontSize:14,marginTop:4}
});
