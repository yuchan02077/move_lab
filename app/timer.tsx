// app/timer.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function TimerScreen() {
  // ─────────────────────────────────────────────────
  // 1) 파라미터 읽어 오기
  const { exercise, time } = useLocalSearchParams();
  const rawExercise = (exercise as string) || '';
  const cleanExercise = rawExercise.replace(/\d+분$/, '').trim();

  // ─────────────────────────────────────────────────
  // 2) time 파라미터 파싱 ("3초" 또는 "30분" 등)
  const timeStr = (time as string) || '';
  let initialTotalSeconds: number;
  if (/초/.test(timeStr)) {
    // 예: "3초"
    const sec = Number(timeStr.replace(/\D/g, ''));
    initialTotalSeconds = isNaN(sec) ? 30 : sec;
  } else {
    // 예: "30분"
    const min = Number(timeStr.replace(/\D/g, ''));
    initialTotalSeconds = isNaN(min) ? 30 * 60 : min * 60;
  }

  // ─────────────────────────────────────────────────
  // 3) 상태 선언: 남은 초, 실행 여부
  const [secondsLeft, setSecondsLeft] = useState<number>(initialTotalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // 4) setInterval 참조용
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 5) 화면 포커스 감지
  const isFocused = useIsFocused();

  // 6) AsyncStorage에 저장할 키
  const storageKey = `TIMER_STATE_${cleanExercise}`;

  // ─────────────────────────────────────────────────
  // 7) 화면 포커스 시 저장된 상태 불러오기 + 경과 시간 반영
  useEffect(() => {
    let isMounted = true;

    const loadState = async () => {
      try {
        const json = await AsyncStorage.getItem(storageKey);
        if (json) {
          const { savedSeconds, savedRunning, savedAt } = JSON.parse(json) as {
            savedSeconds: number;
            savedRunning: boolean;
            savedAt: number;
          };
          if (
            typeof savedSeconds === 'number' &&
            typeof savedRunning === 'boolean' &&
            typeof savedAt === 'number'
          ) {
            if (savedRunning) {
              // “효과 보기” 등으로 백그라운드에 있는 동안 경과된 초 계산
              const elapsed = Math.floor((Date.now() - savedAt) / 1000);
              const newSeconds = savedSeconds - elapsed;
              if (newSeconds > 0) {
                isMounted && setSecondsLeft(newSeconds);
                isMounted && setIsRunning(true);
              } else {
                isMounted && setSecondsLeft(0);
                isMounted && setIsRunning(false);
              }
            } else {
              isMounted && setSecondsLeft(savedSeconds);
              isMounted && setIsRunning(false);
            }
            return;
          }
        }
      } catch {
        // 로딩 중 에러 시 무시
      }
      // 저장된 값이 없거나 잘못되었으면 기본값으로
      isMounted && setSecondsLeft(initialTotalSeconds);
      isMounted && setIsRunning(false);
    };

    if (isFocused) {
      loadState();
    }

    return () => {
      isMounted = false;
    };
  }, [cleanExercise, initialTotalSeconds, isFocused]);

  // ─────────────────────────────────────────────────
  // 8) 언마운트 시 상태 저장
  useEffect(() => {
    return () => {
      const saveState = async () => {
        try {
          const data = {
            savedSeconds: secondsLeft,
            savedRunning: isRunning,
            savedAt: Date.now(),
          };
          await AsyncStorage.setItem(storageKey, JSON.stringify(data));
        } catch {
          // 저장 에러 시 무시
        }
      };
      saveState();
    };
  }, [secondsLeft, isRunning, storageKey]);

  // ─────────────────────────────────────────────────
  // 9) isRunning === true일 때만 1초마다 카운트다운
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // ─────────────────────────────────────────────────
  // 10) “MM:SS” 형식으로 변환
  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const router = useRouter();

  // ─────────────────────────────────────────────────
  // 11) “그만하기” 버튼 눌렀을 때
  const handleQuit = () => {
    Alert.alert(
      '타이머 종료',
      '이 운동을 중단하고 홈 화면으로 돌아가시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            try {
              await AsyncStorage.removeItem(storageKey);
            } catch {
              // 무시
            }
            router.replace('/home');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // ─────────────────────────────────────────────────
  // 12) 원형 Progress 계산
  const radius = 120;           // 반지름
  const strokeWidth = 12;       // 테두리 두께
  const circumference = 2 * Math.PI * radius;
  const elapsed = initialTotalSeconds - secondsLeft;   // 경과된 초
  const progress = Math.min(elapsed / initialTotalSeconds, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ───── 헤더 ───────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>{cleanExercise}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: '/effect', params: { exercise: cleanExercise } })
            }
          >
            <Text style={styles.effectLink}>운동 효과 보기</Text>
          </TouchableOpacity>
        </View>

        {/* ───── 원형 Progress + 시간 ───────────────── */}
        <View style={styles.progressWrapper}>
          <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
            {/* 바탕 트랙 */}
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#D6F0F4"   // 트랙 배경색 (연한 민트톤)
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* 진행 애니메이션 원형 */}
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#84CFFF"   // 진행색 (파스텔 블루)
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
            />
          </Svg>
          {/* 중앙의 시간 텍스트 */}
          <View style={styles.timerTextContainer}>
            <Text style={styles.timerText}>{formatTime()}</Text>
          </View>
        </View>

        {/* ───── 버튼 그룹 (시작 / 일시정지) ───────────────── */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, isRunning && styles.buttonDisabled]}
            onPress={() => setIsRunning(true)}
            disabled={isRunning}
          >
            <Text style={styles.buttonText}>시작</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !isRunning && styles.buttonDisabled]}
            onPress={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            <Text style={styles.buttonText}>일시정지</Text>
          </TouchableOpacity>
        </View>

        {/* ───── “그만하기” 버튼 ───────────────── */}
        <TouchableOpacity style={styles.quitButton} onPress={handleQuit}>
          <Text style={styles.quitText}>그만하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,

    // ─── 여기서 paddingTop 대신 marginTop으로 전체를 아래로 내렸습니다 ───
    marginTop: Platform.OS === 'android' ? 80 : 60,
    // (기존엔 paddingTop: Platform.OS === 'android' ? 40 : 0 이었음)

    alignItems: 'center',
    backgroundColor: '#FFF5F8',
  },

  // ───── 헤더 ───────────────────────────
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 6,
  },
  effectLink: {
    fontSize: 14,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },

  // ───── 원형 Progress ───────────────────
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  timerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#333333',
  },

  // ───── 버튼 그룹 ───────────────────────
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    backgroundColor: '#84CFFF',
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // 그림자 (Android)
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  // ───── “그만하기” ───────────────────────
  quitButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cc0000',
    borderRadius: 8,
    alignItems: 'center',
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    // 그림자 (Android)
    elevation: 2,
  },
  quitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cc0000',
  },
});
