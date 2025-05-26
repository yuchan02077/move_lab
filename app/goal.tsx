import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GoalScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleConfirm = () => {
    if (selectedGoal) {
      router.push('/quiz'); // 선택되었을 때만 퀴즈 화면으로 이동
    } else {
      alert('목표를 선택해주세요!');
    }
  };

  const goals = ['주 7회', '주 5회', '주 3회', '주 1회'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번주 목표 정하기</Text>

      <View style={styles.goalBox}>
        <Text style={styles.placeholder}>선택하세요</Text>
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
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

      <Text style={styles.description}>꾸준함이 중요해요 !!{'\n'}이룰 수 있는 목표 선정하기</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d00057',
    marginBottom: 30,
  },
  goalBox: {
    width: '90%',
    backgroundColor: '#f3faff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  placeholder: {
    color: '#aaa',
    marginBottom: 10,
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
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
