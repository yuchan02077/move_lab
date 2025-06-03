// app/quiz.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import quizData from './quiz_data.json';

interface QuizItem {
  question: string;
  answer: boolean;
  explanation: string;
}

export default function QuizScreen() {
  const [quiz, setQuiz] = useState<QuizItem>({
    question: '',
    answer: true,
    explanation: '',
  });
  const router = useRouter();

  useEffect(() => {
    const random = quizData[Math.floor(Math.random() * quizData.length)];
    setQuiz(random);
  }, []);

  const handleAnswer = (userAnswer: boolean) => {
    const isCorrect = userAnswer === quiz.answer;
    const title = isCorrect ? '🎉 정답!' : '❌ 오답!';
    const correctText = quiz.answer ? '참' : '거짓';
    const message = `정답은 “${correctText}”입니다.\n\n${quiz.explanation}`;

    Alert.alert(title, message, [
      {
        text: '확인',
        // 퀴즈 완료 후 Home 화면으로 이동
        onPress: () => router.replace('home'),
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#FDEFF9', '#FFF5E6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.safeArea}
    >
      <View style={styles.container}>
        {/* 제목 */}
        <Text style={styles.title}>
          오늘의 퀴즈 <Text style={styles.titleEmoji}>❓</Text>
        </Text>

        {/* 말풍선 */}
        <View style={styles.bubbleContainer}>
          <View style={styles.bubble}>
            <Text style={styles.questionText}>{quiz.question}</Text>
            {/* 말풍선 꼬리 */}
            <View style={styles.bubbleTail} />
          </View>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.choiceButton, styles.correctButton]}
            onPress={() => handleAnswer(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.choiceEmoji}>⭕</Text>
            <Text style={styles.choiceLabel}>참</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.choiceButton, styles.wrongButton]}
            onPress={() => handleAnswer(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.choiceEmoji}>❌</Text>
            <Text style={styles.choiceLabel}>거짓</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: Platform.OS === 'android' ? 100 : 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 24,
    textAlign: 'center',
  },
  titleEmoji: {
    fontSize: 28,
  },
  bubbleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 48,
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -12,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    borderRightColor: '#DDDDDD',
    borderRightWidth: 2,
    borderBottomRightRadius: 6,
    transform: [{ rotate: '45deg' }],
  },
  questionText: {
    fontSize: 18,
    color: '#222222',
    lineHeight: 28,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  choiceButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
  },
  correctButton: {
    backgroundColor: '#CDEAFE',
  },
  wrongButton: {
    backgroundColor: '#FAD1D1',
  },
  choiceEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  choiceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});
