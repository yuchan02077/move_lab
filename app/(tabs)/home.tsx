'use client';

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabaseClient';

export default function HomeScreen() {
  const router = useRouter();
  const [dailyGoal, setDailyGoal] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.log('Session error or no session:', sessionError);
        return;
      }
      const userId = session.user.id;

      const { data, error } = await supabase
        .from('goals')
        .select('daily_goal, current_progress')
        .eq('user_id', userId)
        .single();
      if (error) {
        console.log('Error loading goal:', error);
        return;
      }

      setDailyGoal(data.daily_goal);
      setCurrentProgress(data.current_progress);
    })();
  }, []);

  const remaining =
    typeof dailyGoal === 'number'
      ? Math.max(dailyGoal - currentProgress, 0)
      : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Move Lab</Text>

      {remaining !== null && (
        <Text style={styles.progressText}>
          {remaining > 0
            ? `목표까지 ${remaining}개 남았습니다`
            : '목표 달성! 🎉'}
        </Text>
      )}

      <Text style={styles.subtitle}>이제 시작해볼까요?</Text>

      <TouchableOpacity
        style={[styles.button, styles.startButton]}
        onPress={() => router.push('/workout')}
      >
        <Text style={styles.buttonText}>운동 시작하기 🏃‍♂️🏋️‍♀️🧘‍♀️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.historyButton]}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.buttonText}>운동 히스토리 보러가기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace('/login');
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
    backgroundColor: '#FEEFF1',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 24,
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  startButton: {
    backgroundColor: '#A8E6CF',
  },
  historyButton: {
    backgroundColor: '#FFB6C1',
  },
  logoutButton: {
    backgroundColor: '#6B4E4E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
