// app/login.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getISOWeek } from 'date-fns';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const currentWeek = getISOWeek(new Date());
      const savedWeek = await AsyncStorage.getItem('goalWeek');

      // 주차 비교 후 이동
      if (savedWeek !== currentWeek.toString()) {
        await AsyncStorage.setItem('goalWeek', currentWeek.toString());
        router.push('/goal'); // ✅ 목표 설정으로 이동
      } else {
        router.push('/quiz'); // ✅ 홈으로 이동
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBubble}>
        <Text style={styles.headerText}>sign in</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={goToSignup} style={styles.signupLink}>
        <Text style={styles.signupText}>회원가입하기</Text>
        <View style={styles.signupUnderline} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBubble: {
    backgroundColor: '#ffc3ec',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 40,
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#84d1ff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    alignSelf: 'flex-end',
    marginRight: 45,
    marginBottom: 10,
  },
  signupText: {
    fontSize: 12,
    color: 'gray',
  },
  signupUnderline: {
    height: 1,
    width: 60,
    backgroundColor: 'gray',
    marginTop: 2,
  },
});
