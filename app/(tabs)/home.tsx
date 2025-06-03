// app/home.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../../supabaseClient';

interface Goal {
  daily_goal: number;
  current_progress: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState<Goal | null>(null);

  // 로그인된 유저의 Goal을 불러오는 함수
  const fetchGoal = async () => {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      // 로그인 정보가 없으면 다시 로그인 화면으로
      router.replace('login');
      return;
    }

    const { data, error } = await supabase
      .from('goals')
      .select('daily_goal, current_progress')
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      // 목표가 설정되지 않았다면 Goal 화면으로
      router.replace('goal');
      return;
    }
    setGoalData(data as Goal);
    setLoading(false);
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#84CFFF" />
      </View>
    );
  }

  const remaining = Math.max(goalData!.daily_goal - goalData!.current_progress, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 목표</Text>
      <Text style={styles.goalText}>
        총 {goalData!.daily_goal}회 중 {goalData!.current_progress}회 달성
      </Text>
      <Text style={styles.remainingText}>남은 횟수: {remaining}회</Text>

      {/* 운동 시작 버튼 */}
      <TouchableOpacity
        style={styles.buttonStart}
        onPress={() => router.push({ pathname: 'workout' })}
      >
        <Text style={styles.buttonText}>운동 시작하기</Text>
      </TouchableOpacity>

      {/* 운동 이력 보기 버튼 */}
      <TouchableOpacity
        style={styles.buttonHistory}
        onPress={() => router.push('explore')}
      >
        <Text style={styles.buttonText}>운동 이력 보기</Text>
      </TouchableOpacity>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace('login');
        }}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D35D6E',
    marginBottom: 20,
  },
  goalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 18,
    color: '#FF7969',
    marginBottom: 30,
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
    marginTop: 30,
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
});
