import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 sign up 라벨 */}
      <View style={styles.labelWrapper}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>sign up</Text>
        </View>
      </View>

      {/* 입력창 */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F5',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  labelWrapper: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  labelContainer: {
    backgroundColor: '#FFC0E0',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#90D9FF',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
