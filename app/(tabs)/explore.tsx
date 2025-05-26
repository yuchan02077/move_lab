import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ExploreScreen() {
  const data = [
    { name: '걷기', duration: 30 },
    { name: '달리기', duration: 30 },
    { name: '스쿼트', duration: 20 },
    { name: '플랭크', duration: 2 },
    { name: '플랭크', duration: 3 },
  ];

  // 퍼센트 계산용 전체 시간
  const totalTime = 34 + 32 + 34;

  const pieData = [
    {
      name: '유산소',
      population: 34,
      color: '#89CFF0',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: '근력 운동',
      population: 32,
      color: '#6495ED',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: '근지구력',
      population: 34,
      color: '#D8BFD8',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
  ].map(item => ({
    ...item,
    name: `${item.name} (${Math.round((item.population / totalTime) * 100)}%)`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>운동 히스토리</Text>

      <View style={styles.historyBox}>
        <Text style={styles.subHeader}>일주일동안</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>
              • {item.name} <Text style={styles.bold}>{item.duration}분</Text>
            </Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#FFF1F4',
          backgroundGradientFrom: '#FFF1F4',
          backgroundGradientTo: '#FFF1F4',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="20"
        center={[0, 0]}
        hasLegend={true}
        absolute
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D35D6E',
    marginBottom: 20,
  },
  historyBox: {
    backgroundColor: '#DFF3FE',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    width: '85%',
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  listItem: {
    fontSize: 16,
    marginVertical: 2,
    color: '#3CB371',
  },
  bold: {
    fontWeight: 'bold',
  },
});
