//resetcode.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Animated, ActivityIndicator, Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/app/services/auth.service';

export default function ResetCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState({ code: '', general: '' });
  const inputs = useRef<(TextInput | null)[]>([]);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinnerRotation = useRef(new Animated.Value(0)).current;

  // Get email from params or AsyncStorage
  useEffect(() => {
    (async () => {
      const paramEmail = (params.email as string) || '';
      if (paramEmail) {
        setEmail(paramEmail);
        await AsyncStorage.setItem('resetEmail', paramEmail);
      } else {
        const storedEmail = await AsyncStorage.getItem('resetEmail');
        if (storedEmail) setEmail(storedEmail);
        else {
          Alert.alert('Error', 'Email is missing. Please go back and enter your email.');
          router.push('/(auth)/forgot-password');
        }
      }
    })();
  }, [params, router]);

  // Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else setCanResend(true);
  }, [timer]);

  const startButtonAnimation = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.timing(spinnerRotation, { toValue: 1, duration: 1000, useNativeDriver: true })).start();
  };

  const handleCodeChange = (text: string, index: number) => {
    const numText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = numText;
    setCode(newCode);
    if (numText && index < 5) inputs.current[index + 1]?.focus();
    if (errors.code || errors.general) setErrors({ code: '', general: '' });
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Email is missing. Please go back and enter your email.');
      return;
    }

    const codeString = code.join('');
    if (codeString.length !== 6) {
      setErrors({ ...errors, code: 'Enter full 6-digit code' });
      return;
    }

    setLoading(true);
    startButtonAnimation();

    try {
      const result = await authService.verifyResetCodeRequest(email, codeString);
      if (result.valid) {
        router.push({ pathname: '/(auth)/new-password', params: { email, verificationCode: codeString } });
      } else throw new Error('Invalid verification code');
    } catch (err: any) {
      spinnerRotation.stopAnimation();
      buttonScale.setValue(1);
      setErrors({ ...errors, general: err.message || 'Invalid or expired code' });
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;

    setLoading(true);
    try {
      await authService.forgotPasswordRequest(email);
      setTimer(60);
      setCanResend(false);
      Alert.alert('Code Sent', 'A new verification code has been sent.');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to resend code');
    } finally { setLoading(false); }
  };

  const spin = spinnerRotation.interpolate({ inputRange: [0,1], outputRange: ['0deg','360deg'] });
  const formatTime = (s: number) => `${Math.floor(s/60)}:${s%60<10?'0':''}${s%60}`;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Verification Code</Text>
          <View style={styles.placeholder}/>
        </View>

        <View style={styles.content}>
          <Ionicons name="mail-outline" size={80} color={Colors.primary} style={styles.icon}/>
          <Text style={styles.description}>Enter the 6-digit code sent to:</Text>
          <Text style={styles.emailText}>{email}</Text>

          <View style={styles.codeContainer}>
            {code.map((d, i) => (
              <TextInput
                key={i}
                ref={r => { inputs.current[i] = r; }}
                value={d}
                onChangeText={(t)=>handleCodeChange(t,i)}
                onKeyPress={(e)=>handleKeyPress(e,i)}
                keyboardType="number-pad"
                maxLength={1}
                style={[styles.codeInput, (errors.code||errors.general)&&styles.codeInputError, d&&styles.codeInputFilled]}
                editable={!loading}
              />
            ))}
          </View>
          {errors.code ? <Text style={styles.errorText}>{errors.code}</Text> : null}

          <Animated.View style={{transform:[{scale:buttonScale}]}}>
            <TouchableOpacity style={[styles.verifyButton, loading&&styles.verifyButtonDisabled]} onPress={handleVerifyCode} disabled={loading}>
              {loading?(
                <View style={styles.loadingContainer}>
                  <Animated.View style={{transform:[{rotate:spin}]}}>
                    <ActivityIndicator size="small" color={Colors.white}/>
                  </Animated.View>
                  <Text style={styles.verifyButtonText}>Verifying...</Text>
                </View>
              ):<Text style={styles.verifyButtonText}>Verify Code</Text>}
            </TouchableOpacity>
          </Animated.View>

          {errors.general? <View style={styles.generalErrorContainer}><Ionicons name="alert-circle-outline" size={18} color={Colors.error}/><Text style={styles.generalErrorText}>{errors.general}</Text></View>:null}

          <View style={styles.resendContainer}>
            {!canResend ? <Text style={styles.timerText}>Resend in {formatTime(timer)}</Text> : 
              <TouchableOpacity onPress={handleResend} disabled={loading}>{loading?<ActivityIndicator/>:<Text style={styles.resendLink}>Resend Code</Text>}</TouchableOpacity>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles (unchanged from your code)
const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:Colors.white}, scrollContent:{flexGrow:1},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20,borderBottomWidth:1,borderBottomColor:Colors.borderGray},
  backButton:{padding:8}, title:{fontSize:20,fontWeight:'bold',color:Colors.black}, placeholder:{width:40},
  content:{padding:20,alignItems:'center'}, icon:{marginTop:40,marginBottom:24}, description:{fontSize:16,color:Colors.gray,textAlign:'center',marginBottom:8,lineHeight:24},
  emailText:{fontSize:16,fontWeight:'bold',color:Colors.black,marginBottom:32},
  codeContainer:{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:8},
  codeInput:{width:48,height:60,borderWidth:1,borderColor:Colors.borderGray,borderRadius:8,textAlign:'center',fontSize:24,fontWeight:'bold',color:Colors.black,backgroundColor:Colors.white},
  codeInputError:{borderColor:Colors.error},
  codeInputFilled:{borderColor:Colors.primary,backgroundColor:Colors.primary+'10'},
  verifyButton:{backgroundColor:Colors.primary,paddingVertical:16,borderRadius:8,alignItems:'center',width:'100%',minHeight:54,justifyContent:'center',marginTop:32},
  verifyButtonDisabled:{opacity:0.8}, loadingContainer:{flexDirection:'row',alignItems:'center',gap:12},
  verifyButtonText:{color:Colors.white,fontSize:16,fontWeight:'bold'},
  errorText:{color:Colors.error,fontSize:14,marginTop:4,width:'100%',textAlign:'center'},
  generalErrorContainer:{backgroundColor:Colors.error+'20',padding:12,borderRadius:8,marginTop:16,borderLeftWidth:4,borderLeftColor:Colors.error,width:'100%',flexDirection:'row',alignItems:'center',gap:8},
  generalErrorText:{color:Colors.error,fontSize:14,fontWeight:'500',flex:1},
  resendContainer:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:32},
  timerText:{color:Colors.gray,fontSize:14,fontWeight:'bold'},
  resendLink:{color:Colors.primary,fontSize:14,fontWeight:'bold'}
});
