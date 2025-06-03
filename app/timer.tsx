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
import { supabase } from '../supabaseClient';

export default function TimerScreen() {
  // 1) 파라미터 읽어오기
  const { exercise, time } = useLocalSearchParams();
  const rawExercise = (exercise as string) || '';
  const cleanExercise = rawExercise.replace(/\(\S+\)/, '').trim(); // ex: "걷기(유산소)" → "걷기"

  // 2) time 파싱
  const timeStr = (time as string) || '';
  let initialTotalSeconds: number;
  if (/초/.test(timeStr)) {
    const sec = Number(timeStr.replace(/\D/g, ''));
    initialTotalSeconds = isNaN(sec) ? 30 : sec;
  } else {
    const min = Number(timeStr.replace(/\D/g, ''));
    initialTotalSeconds = isNaN(min) ? 30 * 60 : min * 60;
  }

  // 3) 상태 선언
  const [secondsLeft, setSecondsLeft] = useState<number>(initialTotalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFocused = useIsFocused();
  const router = useRouter();

  // AsyncStorage 키 (운동 이력 저장용)
  const historyKey = 'WORKOUT_HISTORY';

  // 7) 화면 포커스 시 상태 복원 (생략) ...

  // 8) 언마운트 시 타이머 상태 저장 (생략) ...

  // 9) 타이머 작동
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

  // 11) “그만하기” 버튼
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
            router.replace('home');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // 12) 타이머 완료 시 호출될 함수
  const handleComplete = async () => {
    // ① 0초 되었을 때 타이머 중지
    setIsRunning(false);

    // ② AsyncStorage에 운동 이력 추가
    try {
      const existing = await AsyncStorage.getItem(historyKey);
      const history = existing ? JSON.parse(existing) as Array<{ exercise: string; duration: number }> : [];
      history.push({ exercise: cleanExercise, duration: initialTotalSeconds });
      await AsyncStorage.setItem(historyKey, JSON.stringify(history));
    } catch {
      // 저장 에러 무시
    }

    // ③ Supabase goals.current_progress 1 증가
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();
    if (currentUser && !userError) {
      // 현재 진행도 불러오기
      const { data, error } = await supabase
        .from('goals')
        .select('current_progress')
        .eq('user_id', currentUser.id)
        .single();

      if (!error && data) {
        const newProgress = data.current_progress + 1;
        await supabase
          .from('goals')
          .update({ current_progress: newProgress })
          .eq('user_id', currentUser.id);
      }
    }

    // 완료 메시지 후 홈 화면으로
    Alert.alert('축하합니다!', `${cleanExercise} 운동을 완료했습니다.`, [
      { text: '확인', onPress: () => router.replace('home') },
    ]);
  };

  // 타이머가 0이 되면 handleComplete 호출
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      handleComplete();
    }
  }, [secondsLeft]);

  // 10) 시간 표시 포맷
  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  // 12) 원형 Progress 계산
  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const elapsed = initialTotalSeconds - secondsLeft;
  const progress = Math.min(elapsed / initialTotalSeconds, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>{cleanExercise}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: 'effect', params: { exercise: cleanExercise } })
            }
          >
            <Text style={styles.effectLink}>운동 효과 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 원형 Progress + 시간 */}
        <View style={styles.progressWrapper}>
          <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
            {/* 바탕 트랙 */}
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#D6F0F4"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* 진행 애니메이션 원형 */}
            <Circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#84CFFF"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
            />
          </Svg>
          <View style={styles.timerTextContainer}>
            <Text style={styles.timerText}>{formatTime()}</Text>
          </View>
        </View>

        {/* 버튼 그룹 */}
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

        {/* 그만하기 버튼 */}
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
    marginTop: Platform.OS === 'android' ? 80 : 60,
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
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
  quitButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cc0000',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  quitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cc0000',
  },
});
