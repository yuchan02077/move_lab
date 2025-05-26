import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* MOVE 줄 */}
      <View style={[styles.row, styles.moveRow]}>
        {['M', 'O', 'V', 'E'].map((char, i) => (
          <View key={i} style={styles.circle}>
            <Text style={styles.circleText}>{char}</Text>
          </View>
        ))}
      </View>

      {/* LAB 줄 */}
      <View style={[styles.row, styles.labRow]}>
        {['L', 'A', 'B'].map((char, i) => (
          <View key={i} style={styles.circle}>
            <Text style={styles.circleText}>{char}</Text>
          </View>
        ))}
      </View>

      {/* 설명 */}
      <Text style={styles.description}>
        당신의 운동, 이제 과학으로 설명됩니다.
      </Text>

      {/* 시작하기 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEFF1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 10,
  },
  moveRow: {
    marginBottom: 17,
    marginLeft: -28,
  },
  labRow: {
    paddingLeft: 70,
    marginBottom: 32,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DFF3FE',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
