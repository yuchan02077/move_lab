import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TimerScreen() {
 const { exercise, time } = useLocalSearchParams();

const parsedTime = typeof time === 'string' ? parseInt(time.replace('분', '')) : 30;
const totalTimeInSeconds = (parsedTime || 30) * 60;


  const [secondsLeft, setSecondsLeft] = useState(totalTimeInSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); // ✅ 핵심 수정

  // ⏱️ 타이머 작동
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exercise}>{exercise || '운동'}</Text>
      <Text style={styles.tip}>운동의 효과 과학적으로 알아보기</Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime()}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRunning(true)}
        >
          <Text style={styles.buttonText}>start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRunning(false)}
        >
          <Text style={styles.buttonText}>stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exercise: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  tip: {
    fontSize: 12,
    color: '#666',
    marginBottom: 40,
  },
  timerBox: {
    backgroundColor: '#D8D6FB',
    padding: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3399CC',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
