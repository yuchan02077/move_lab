import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';

export default function ExploreScreen() {
  const historyData = [
    { name: '걷기', duration: 30 },
    { name: '달리기', duration: 30 },
    { name: '스쿼트', duration: 20 },
    { name: '플랭크', duration: 2 },
    { name: '자전거', duration: 3 },
  ];

  const chartData = [
    { x: '유산소', y: 34 },
    { x: '근력', y: 32 },
    { x: '근지구력', y: 34 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏃‍♀️ 운동 히스토리</Text>

      <View style={styles.historyBox}>
        <Text style={styles.subHeader}>📅 지난 7일간 기록</Text>
        <FlatList
          data={historyData}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>
              • {item.name} <Text style={styles.bold}>{item.duration}분</Text>
            </Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <Text style={styles.chartTitle}>📊 운동 비율 차트</Text>
      <VictoryPie
        data={chartData}
        colorScale={['#89CFF0', '#6495ED', '#D8BFD8']}
        labels={({ datum }: any) => `${datum.x}\n${datum.y}%`}
        labelRadius={({ innerRadius }: any) => innerRadius + 30}
        innerRadius={60}
        padAngle={3}
        style={{
          labels: { fill: '#333', fontSize: 14, fontWeight: '600', textAlign: 'center' },
        }}
        width={320}
        height={260}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D35D6E',
    marginBottom: 20,
  },
  historyBox: {
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    width: '85%',
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
  bold: {
    fontWeight: 'bold',
    color: '#444',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: '#444',
  },
});
