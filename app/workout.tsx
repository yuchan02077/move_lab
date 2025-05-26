import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import scienceFacts from './science.json';

export default function WorkoutScreen() {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [randomTip, setRandomTip] = useState('');

  const exerciseOptions = [
    '걷기(유산소)', '줄넘기(유산소)', '러닝(달리기)[유산소]',
    '사이클(자전거)[유산소]', '스쿼트(근력 운동)', '플랭크(근지구력 운동)',
  ];
  const timeOptions = ['30분', '60분', '90분', '120분'];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * scienceFacts.length);
    setRandomTip(scienceFacts[randomIndex].text);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Move{'\n'}<Text style={styles.lab}>Lab</Text></Text>

      <Text style={styles.subtitle}>오늘의 간편 과학상식</Text>
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>{randomTip}</Text>
      </View>

      {/* 운동 선택 */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setShowExerciseOptions(!showExerciseOptions)}
      >
        <Text style={styles.placeholder}>
          {selectedExercise || '운동 선택'}
        </Text>
      </TouchableOpacity>
      {showExerciseOptions && (
        <FlatList
          data={exerciseOptions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setSelectedExercise(item);
              setShowExerciseOptions(false);
            }}>
              <Text
                style={[
                  styles.dropdownItem,
                  selectedExercise === item && styles.selectedText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {/* 팁 링크 */}
      <TouchableOpacity onPress={() => router.push('/tip')}>
        <Text style={styles.tipTitle}>고르기 팁</Text>
        <View style={styles.underline}></View>
      </TouchableOpacity>

      {/* 시간 선택 */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setShowTimeOptions(!showTimeOptions)}
      >
        <Text style={styles.placeholder}>
          {selectedTime || '운동 시간(30분 단위)'}
        </Text>
      </TouchableOpacity>
      {showTimeOptions && (
        <FlatList
          data={timeOptions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setSelectedTime(item);
              setShowTimeOptions(false);
            }}>
              <Text
                style={[
                  styles.dropdownItem,
                  selectedTime === item && styles.selectedText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (selectedExercise && selectedTime) {
            router.push({
              pathname: '/timer',
              params: { exercise: selectedExercise, time: selectedTime },
            });
          }
        }}
      >
        <Text style={styles.nextText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF1F4', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 40, color: '#000' },
  lab: { fontSize: 24, fontWeight: 'bold', color: '#444' },
  subtitle: { fontSize: 16, color: '#567', marginTop: 20, marginBottom: 10 },
  tipBox: { backgroundColor: '#D9F3E9', padding: 16, borderRadius: 8, marginBottom: 20 },
  tipText: { fontSize: 14, color: '#222', lineHeight: 22 },
  selector: { backgroundColor: '#F5FAFB', padding: 16, borderRadius: 10, marginVertical: 10 },
  placeholder: { color: '#999' },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#666',
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tipTitle: { fontSize: 12, color: 'gray', marginTop: 4, marginLeft: '80%' },
  underline: { width: 70, height: 1, backgroundColor: '#ccc', marginVertical: 4, marginLeft: '77.5%' },
  nextButton: { backgroundColor: '#84CFFF', padding: 14, alignItems: 'center', borderRadius: 10, marginTop: 24 },
  nextText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
