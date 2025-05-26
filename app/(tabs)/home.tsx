import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 제목 */}
      <View style={styles.header}>
        <Text style={styles.title}>Move</Text>
        <Text style={styles.subtitle}>Lab</Text>
      </View>

      {/* 설명 */}
      <Text style={styles.description}>이제 시작해볼까요?</Text>

      {/* 버튼들 */}
      <TouchableOpacity style={styles.buttonStart} onPress={() => router.push('/workout')}>
        <Text style={styles.buttonText}>운동 시작하기 🏃‍♀️🏋️‍♂️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonHistory} onPress={() => router.push('/explore')}>
        <Text style={styles.buttonText}>운동 히스토리 보러가기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogout} onPress={() => router.replace('/login')}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 로고 텍스트 */}
      <Text style={styles.logoText}>
        MOVE
        <Text style={{ color: '#f06' }}>LAB</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 40,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonStart: {
    backgroundColor: '#C1EAC5',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonHistory: {
    backgroundColor: '#F7B8D3',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonLogout: {
    backgroundColor: '#6B4B4B',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoText: {
    marginTop: 20,
    fontSize: 20,
    color: '#888',
  },
});
