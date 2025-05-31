import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TipScreen() {
  const [openIndex, setOpenIndex] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const tips = [
    {
      title: '🏃‍♀️ 유산소 운동이란?',
      content: `유산소 운동은 산소를 이용해 에너지를 만들어내며 하는 운동이에요.
호흡과 심박수를 높게 유지하며 전신을 사용하는 운동이죠.
예를 들면 걷기, 줄넘기, 자전거 타기 같은 운동이 이에 해당해요.
이런 운동은 심장과 폐의 건강을 향상시키고 혈액의 순환을 도와줘요.
지방을 에너지로 쓰기 때문에 체지방 감소에도 효과적이에요.`,
    },
    {
      title: '🏋️ 근력 운동이란?',
      content: `근력 운동은 근육에 강한 자극을 주는 운동이에요.
대표적으로 스쿼트, 런지, 푸쉬업 같은 운동이 있어요.
근육량이 늘어나면 기초 대사량이 증가해 다이어트에도 좋아요.
뼈와 관절을 튼튼하게 만들어주기도 해요.`,
    },
    {
      title: '🤸‍♀️ 근지구력 운동이란?',
      content: `근지구력은 근육을 오랫동안 사용하는 능력이에요.
플랭크, 버피, 마운틴클라이머 같은 운동이 포함돼요.
근육이 지치지 않고 오래 쓸 수 있도록 도와줘요.
일상생활이나 스포츠 활동에서 체력을 기르기에 좋아요.`,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>고르기 Tip</Text>

      {tips.map((tip, idx) => (
        <View key={idx} style={styles.box}>
          <TouchableOpacity onPress={() => toggle(idx)}>
            <Text style={styles.title}>{tip.title}</Text>
          </TouchableOpacity>
          {openIndex.includes(idx) && (
            <Text style={styles.content}>{tip.content}</Text>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>돌아가기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF1F4', padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#D35D6E', marginBottom: 24 },
  box: {
    backgroundColor: '#D9F3E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  content: {
    marginTop: 12,
    color: '#333',
    lineHeight: 22,
  },
  back: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'underline',
  },
});
