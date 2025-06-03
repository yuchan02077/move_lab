// app/explore.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface HistoryItem {
  exercise: string;
  duration: number; // 초 단위
}

export default function ExploreScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // AsyncStorage에서 이력 불러오기
  const loadHistory = async () => {
    try {
      const raw = await AsyncStorage.getItem('WORKOUT_HISTORY');
      const parsed = raw ? (JSON.parse(raw) as HistoryItem[]) : [];
      setHistory(parsed);
    } catch {
      setHistory([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // 총 시간과 운동 종류별 합산
  const aggregate = () => {
    const map: Record<string, number> = {};
    let total = 0;
    history.forEach((item) => {
      map[item.exercise] = (map[item.exercise] || 0) + item.duration;
      total += item.duration;
    });
    return { map, total };
  };

  const { map, total } = aggregate();

  // PieChart에 들어갈 데이터 생성
  const chartData = Object.keys(map).map((ex) => {
    const minutes = Math.round((map[ex] / total) * 100);
    return {
      name: ex,
      population: minutes,
      color: randomColorFor(ex),
      legendFontColor: '#000',
      legendFontSize: 14,
    };
  });

  // 랜덤 컬러 함수 (간단 예시)
  function randomColorFor(key: string) {
    const colors = ['#89CFF0', '#6495ED', '#D8BFD8', '#FFC0CB', '#98FB98'];
    const idx = Math.abs(hashCode(key)) % colors.length;
    return colors[idx];
  }
  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#84CFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏃‍♀️ 운동 히스토리</Text>

      <View style={styles.historyBox}>
        <Text style={styles.subHeader}>📅 누적 기록</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>
              • {item.exercise} — {Math.floor(item.duration / 60)}분 {item.duration % 60}초
            </Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <Text style={styles.chartTitle}>🧩 운동 분포 차트 (백분율)</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#FFF1F4',
            backgroundGradientFrom: '#FFF1F4',
            backgroundGradientTo: '#FFF1F4',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          hasLegend={true}
        />
      ) : (
        <Text style={styles.noData}>운동 이력이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D35D6E',
    marginBottom: 20,
  },
  historyBox: {
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    alignSelf: 'center',
  },
  listItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#008080',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  noData: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
});
