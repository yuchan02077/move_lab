import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TipScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>고르기 Tip</Text>

      {/* 유산소 운동 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏃‍♀️ 유산소 운동이란?</Text>
        <Text style={styles.sectionText}>
          유산소 운동은 산소를 이용해서 에너지를 만들어내야 하는 운동이에요.{'\n'}
          보통 오래 지속할 수 있는 중간 강도의 운동으로,{'\n'}
          대표적으로 걷기, 줄넘기, 러닝(달리기), 사이클(자전거) 등이 해당돼요.{'\n'}
          이런 운동은 심장과 폐의 기능을 향상시키고 혈액과 산소의 순환을 도와주며,{'\n'}
          체지방 감소에 효과적이죠.{'\n'}
          일반적으로 20분 이상 지속할 때 지방 대사가 활성화돼요.{'\n'}
          또한 유산소 운동은 스트레스를 완화하고, 기분을 좋게 만드는 호르몬도 분비시켜{'\n'}
          정신 건강에도 도움을 줘요.{'\n'}
          이런 이유로 다이어트나 기본 체력 향상에 자주 추천되죠!
        </Text>
      </View>

      {/* 근력 운동 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏋️‍♂️ 근력 운동이란?</Text>
        <Text style={styles.sectionText}>
          근력 운동은 근육에 강한 자극을 주는 운동이에요.{'\n'}
          무거운 물체를 들거나 저항에 맞서 반복하는 방식이 많죠.{'\n'}
          예를 들면 스쿼트, 푸쉬업, 런지, 덤벨 들기 같은 게 이에 해당돼요.{'\n'}
          이런 운동은 근육량 증가에 아주 효과적이고,{'\n'}
          모든 체력 요소의 기본을 강화해줘요.{'\n'}
          기초대사량을 높여 살이 덜 찌게 만들어주고,{'\n'}
          체형 잡기에도 탁월한 효과를 보이게 해요.{'\n'}
          이런 다이어트에도 효과적인 이유죠.{'\n'}
          특히 나이가 들수록 꼭 필요한 운동이에요.{'\n'}
          뼈를 강화하고, 노화 방지나 당뇨 예방에도 효과적입니다.
        </Text>
      </View>

      {/* 근지구력 운동 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧘‍♀️ 근지구력 운동이란?</Text>
        <Text style={styles.sectionText}>
          근지구력 운동은 근육을 오랜 시간 사용하는 능력을 기르는 운동이에요.{'\n'}
          예를 들면 플랭크를 일정 시간 유지하거나,{'\n'}
          낮은 무게의 덤벨을 여러 번 반복하는 것이 이에 해당돼요.{'\n'}
          이런 운동은 특히{' '}
          <Text style={styles.bold}>기초 체력 향상</Text>이나{' '}
          <Text style={styles.bold}>자세 유지</Text>에 도움이 돼요.{'\n'}
          몸의 밸런스를 잡아주는 데 효과적이고,{'\n'}
          운동을 오래할 수 있게 도와줘요.{'\n'}
          예를 들면 장시간 러닝이나 마라톤에도 도움이 되죠.{'\n'}
          또한 <Text style={styles.bold}>코어 근육</Text>을 강화해서{'\n'}
          허리 통증이나 자세 교정에도 효과를 줄 수 있지요.{'\n'}
          잘 알려지진 않았지만, 운동을 잘 해내기 위해 꼭 필요한 운동 중 하나랍니다.
        </Text>
      </View>

      {/* 돌아가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/workout')}>
        <Text style={styles.backButtonText}>돌아가기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35D6E',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#D9F3E9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
