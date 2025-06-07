'use client';    
// app/goal.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabaseClient';

export default function GoalScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const goals = ['주 7회', '주 5회', '주 3회', '주 1회'];

  const handleConfirm = async () => {
    if (!selectedGoal) {
      Alert.alert('목표를 선택해주세요!');
      return;
    }
    setLoading(true);
    const goalNumber = Number(selectedGoal.replace(/\D/g, ''));

    // 현재 로그인된 사용자 정보
    const {
      data: { user: currentUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError || !currentUser) {
      Alert.alert('로그인 필요', '목표를 저장하려면 로그인해주세요.');
      setLoading(false);
      return;
    }

    // goals 테이블에 upsert (이미 있으면 update, 없으면 insert)
    const { error: upsertError } = await supabase
      .from('goals')
      .upsert({
        user_id: currentUser.id,
        daily_goal: goalNumber,
        current_progress: 0, // 초기 진행도는 0
      })
      .eq('user_id', currentUser.id);

    if (upsertError) {
      console.error('goals 테이블 업서트 오류:', upsertError.message);
      Alert.alert('오류', '목표 저장 중 문제가 발생했습니다.');
      setLoading(false);
      return;
    }

    // 목표 설정 후 퀴즈 화면으로 이동
    router.replace('quiz');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 목표 정하기</Text>

      <View style={styles.goalBox}>
        <Text style={[styles.placeholder, selectedGoal && styles.selectedText]}>
          {selectedGoal || '선택하세요'}
        </Text>
        {goals.map((goal, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.goalOption,
              selectedGoal === goal && styles.selectedOption,
            ]}
            onPress={() => setSelectedGoal(goal)}
          >
            <Text style={styles.optionText}>{goal}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.description}>
        자신에게 맞는 주간 목표 횟수를 선택하세요.
      </Text>

      <TouchableOpacity
        style={[styles.confirmButton, loading && styles.buttonDisabled]}
        onPress={handleConfirm}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmText}>확인</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d00057',
    marginBottom: 20,
  },
  goalBox: {
    width: '90%',
    backgroundColor: '#f3faff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  placeholder: {
    color: '#aaa',
    marginBottom: 10,
    fontSize: 16,
  },
  selectedText: {
    color: '#000',
  },
  goalOption: {
    backgroundColor: '#e7f5ff',
    padding: 14,
    borderRadius: 20,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#cdeeff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#222',
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#84d1ff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
