// app/login.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabaseClient'; // Supabase 인증 활용

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setLoading(true);
    // Supabase로 실제 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('로그인 실패', error.message);
      setLoading(false);
      return;
    }
    // 로그인 성공 → 목표 설정 화면으로 이동
    router.replace('goal');
    setLoading(false);
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

      <Text style={styles.title}>로그인</Text>

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
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? '로그인 중...' : '로그인하기'}</Text>
      </TouchableOpacity>

      {/* 회원가입 링크 */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>계정이 없으신가요?</Text>
        <TouchableOpacity onPress={() => router.push('signup')}>
          <Text style={styles.signupLink}>회원가입</Text>
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
  signupContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  signupText: {
    color: '#444',
    marginRight: 6,
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
