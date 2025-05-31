// app/timer.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TimerScreen() {
  // 1) 이전 화면에서 넘어온 exercise, time 파라미터 받기
  const { exercise, time } = useLocalSearchParams();
  const rawExercise = (exercise as string) || '';
  // 2) “걷기 30분”처럼 붙어 넘어온다면 숫자+분을 제거해서 순수 운동명만 남기기
  const cleanExercise = rawExercise.replace(/\d+분$/, '').trim();

  // 3) time 파라미터(예: "30분")에서 숫자만 뽑아 초로 환산. 파싱 실패 시 기본 30분
  const initialTotalSeconds = (Number((time as string)?.replace('분', '')) || 30) * 60;

  // 4) 상태: 남은 초, 실행 여부
  const [secondsLeft, setSecondsLeft] = useState<number>(initialTotalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // 5) setInterval 반환값을 저장할 Ref
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 6) 화면 포커스 상태 (Focus/Blur) 감지
  const isFocused = useIsFocused();

  // 7) AsyncStorage에 저장할 고유 키 (운동명마다 별도 저장)
  const storageKey = `TIMER_STATE_${cleanExercise}`;

  // 8) 포커스가 들어올 때(처음 마운트되거나 돌아왔을 때) 저장된 상태 불러오기
  useEffect(() => {
    if (!cleanExercise) return; // exercise 파라미터 없으면 무시

    const loadState = async () => {
      try {
        const json = await AsyncStorage.getItem(storageKey);
        if (json) {
          const { savedSeconds, savedRunning } = JSON.parse(json) as {
            savedSeconds: number;
            savedRunning: boolean;
          };
          // 불러온 값이 유효하면 상태에 반영
          if (typeof savedSeconds === 'number' && typeof savedRunning === 'boolean') {
            setSecondsLeft(savedSeconds);
            setIsRunning(savedRunning);
            return;
          }
        }
      } catch {
        // 로딩 에러 발생 시 그냥 초기 값 사용
      }
      // 저장된 상태 없거나 문제가 있으면 기본값 사용
      setSecondsLeft(initialTotalSeconds);
      setIsRunning(false);
    };

    loadState();
  }, [cleanExercise, initialTotalSeconds]);

  // 9) 포커스가 벗어날 때(다른 화면으로 이동) 상태 저장
  useEffect(() => {
    // isFocused가 false가 될 때 → 화면이 Blur 됨
    if (!isFocused) {
      const saveState = async () => {
        try {
          await AsyncStorage.setItem(
            storageKey,
            JSON.stringify({ savedSeconds: secondsLeft, savedRunning: isRunning })
          );
        } catch {
          // 저장 실패 시 무시
        }
      };
      saveState();
    }
    // secondsLeft 혹은 isRunning이 바뀌어도 Blur 시점에 최신 상태가 저장됨
  }, [isFocused, secondsLeft, isRunning, storageKey]);

  // 10) isRunning이 true일 때만 카운트다운 동작
  useEffect(() => {
    if (!isRunning) return;

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

    return () => {
      // isRunning이 false가 되거나 언마운트 시, Interval 해제
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // 11) 남은 초를 "MM:SS" 형식으로 포맷팅
  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 12) 맨 위에 선택된 운동명을 크게 표시 */}
        <Text style={styles.exerciseTitle}>{cleanExercise}</Text>

        {/* 13) 운동의 효과 화면으로 이동하는 링크 */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/effect',
              params: { exercise: cleanExercise },
            })
          }
        >
          <Text style={styles.subText}>운동의 효과 과학적으로 알아보기</Text>
        </TouchableOpacity>

        {/* 14) 타이머 박스 */}
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{formatTime()}</Text>
        </View>

        {/* 15) Start / Stop 버튼 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => setIsRunning(true)}>
            <Text style={styles.buttonText}>start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsRunning(false)}>
            <Text style={styles.buttonText}>stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F2FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20, // SafeAreaView가 상단 여유 확보, 약간의 여백만 줌
  },
  exerciseTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#444',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  timerBox: {
    width: 280,
    height: 160,
    backgroundColor: '#D6D9FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4BA7C8',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#DDD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
