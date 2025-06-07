'use client';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabaseClient';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log('SignUp data:', data, 'error:', error);
    setLoading(false);

    if (error) {
      Alert.alert('회원가입 실패', error.message);
      return;
    }

    Alert.alert('회원가입 완료', '이메일로 전송된 인증 링크를 확인해주세요.');
    router.replace('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
      {/* 로고: MOVE / LAB */}
      <View style={styles.logoContainer}>
        <View style={[styles.row, styles.moveRow]}>        
          {['M', 'O', 'V', 'E'].map((char, i) => (
            <View key={i} style={styles.circleSmall}>
              <Text style={styles.circleTextSmall}>{char}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.row, styles.labRow]}>        
          {['L', 'A', 'B'].map((char, i) => (
            <View key={i} style={styles.circleSmall}>
              <Text style={styles.circleTextSmall}>{char}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.title}>회원가입</Text>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>회원가입하기</Text>
        )}
      </TouchableOpacity>

      {/* 로그인 링크 */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>로그인</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEFF1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  moveRow: {
    marginBottom: 6,
    marginLeft: -24,
  },
  labRow: {
    paddingLeft: 60,
  },
  circleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#FFF',
    color: '#000',
  },
  button: {
    width: '100%',
    backgroundColor: '#DFF3FE',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  loginText: {
    color: '#444',
    marginRight: 6,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
