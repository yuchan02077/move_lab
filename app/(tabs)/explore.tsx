import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function ExploreScreen() {
  const historyData = [
    { name: '걷기', duration: 30 },
    { name: '달리기', duration: 30 },
    { name: '스쿼트', duration: 20 },
    { name: '플랭크', duration: 2 },
    { name: '자전거', duration: 3 },
  ];

  const chartData = [
    {
      name: '유산소',
      population: 34,
      color: '#89CFF0',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: '근력 운동',
      population: 32,
      color: '#6495ED',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: '근지구력',
      population: 34,
      color: '#D8BFD8',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
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

      <Text style={styles.chartTitle}>🧩 운동 분포 차트</Text>
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
        // 퍼센트, 숫자 제거
        // absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    paddingTop: 60,
    alignItems: 'center',
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
    marginBottom: 10,
    color: '#444',
  },
});
