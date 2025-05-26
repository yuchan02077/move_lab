import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import quizData from './quiz_data.json'; // 경로는 app 폴더 내에 있어야 함

export default function QuizScreen() {
  const [quiz, setQuiz] = useState({ question: '', answer: true, explanation: '' });
  const router = useRouter();

  useEffect(() => {
    const random = quizData[Math.floor(Math.random() * quizData.length)];
    setQuiz(random);
  }, []);

  const handleAnswer = (userAnswer: boolean) => {
    const correct = userAnswer === quiz.answer;

    Alert.alert(
      correct ? '정답!' : '땡!',
      quiz.explanation,
      [
        {
          text: '확인',
          onPress: () => router.replace('/home'), // ✅ 홈 화면으로 이동
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 퀴즈</Text>

      <View style={styles.speechBubble}>
        <Text style={styles.questionText}>{`“${quiz.question}”`}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleAnswer(true)} style={[styles.choiceButton, styles.correctButton]}>
          <Text style={styles.choiceText}>⭕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnswer(false)} style={[styles.choiceButton, styles.wrongButton]}>
          <Text style={styles.choiceText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 30,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    padding: 20,
    borderRadius: 20,
    maxWidth: '90%',
    marginBottom: 40,
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
  },
  choiceButton: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#888',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  correctButton: {
    backgroundColor: '#ccd8ff',
  },
  wrongButton: {
    backgroundColor: '#ffd8d8',
  },
  choiceText: {
    fontSize: 36,
  },
});
