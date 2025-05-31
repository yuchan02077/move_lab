// app/effect.tsx
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const effectTexts: { [key: string]: string[] } = {
  걷기: [
    '1. 심장박동이 빨라져 몸 전체에 더 많은 혈액과 산소 공급',
    '2. 심장이 더 튼튼해지고 혈관이 유연해져 고혈압 및 심혈관 질환 예방 효과',
    '3. 20분 이상 지속하면 지방 대사가 활성화되어 체지방 감소에 도움',
    '4. 하체 근지구력 강화 및 세로토닌·엔도르핀 분비 촉진으로 스트레스 해소',
  ],
  줄넘기: [
    '1. 전신 유산소 운동으로 심폐 기능 강화',
    '2. 짧은 시간에 많은 칼로리 소모로 효과적인 체지방 감소',
    '3. 균형감각과 민첩성 향상, 하체·코어 근력 강화',
    '4. 리듬감에 따른 엔도르핀 분비로 스트레스 해소 및 기분 전환',
  ],
  러닝: [
    '1. 꾸준한 러닝으로 심장 기능 개선 및 혈압 정상화에 도움',
    '2. 전신 근육(하체, 코어)을 사용하여 기초대사량 증가 및 체지방 감소 효과',
    '3. 뼈 밀도 향상으로 골다공증 예방에 기여',
    '4. 러닝 중 분비되는 엔도르핀·세로토닌이 정신적 안정과 스트레스 감소에 기여',
  ],
  사이클: [
    '1. 무릎·발목 관절에 부담을 덜어주는 유산소 운동으로 심폐 지구력 강화',
    '2. 하체(대퇴사두근, 햄스트링, 종아리) 집중 강화 및 근지구력 향상',
    '3. 실내/실외 모두 가능해 지속적인 칼로리 소모와 체중 관리 도움',
    '4. 스트레스 완화 및 우울감 감소에 긍정적 영향을 주는 엔도르핀 분비 촉진',
  ],
  스쿼트: [
    '1. 허벅지, 엉덩이, 코어 등 하체 주요 근육군 집중 단련',
    '2. 하체·코어 근력 증가로 자세 교정 및 일상생활 동작 안정성 향상',
    '3. 대사량 증가로 기초대사율 상승, 체지방 감소 효과',
    '4. 스쿼트 동작 중 균형 유지로 전반적인 운동 수행 능력과 유연성 향상',
  ],
  플랭크: [
    '1. 코어 근육(복근, 척추 기립근, 복사근) 전반적 강화를 통해 허리 안정성 확보',
    '2. 등과 어깨 근육 활성화로 자세 교정 및 척추 건강에 도움',
    '3. 전신 근지구력 향상으로 일상생활 활동 시 피로도 감소',
    '4. 짧은 시간에 다양한 근육을 동시에 사용하여 효과적인 칼로리 소모',
  ],
};

export default function EffectScreen() {
  const { exercise } = useLocalSearchParams();
  // TimerScreen에서 넘겨준 cleanExercise 그대로 사용
  const cleanExercise = (exercise as string) || '';

  const effects = effectTexts[cleanExercise];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cleanExercise}의 장점</Text>

      <View style={styles.box}>
        {effects ? (
          effects.map((line, index) => (
            <Text key={index} style={styles.text}>
              {line}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>해당 운동 정보가 없습니다.</Text>
        )}
      </View>

      {/* 선택된 운동별 일러스트 또는 추가 메시지 */}
      {cleanExercise === '걷기' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🚶‍♂️ 꾸준한 걷기로 건강한 하루를 시작하세요!
          </Text>
        </View>
      )}
      {cleanExercise === '줄넘기' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🤸‍♀️ 줄넘기로 민첩함과 체력을 동시에 UP!
          </Text>
        </View>
      )}
      {cleanExercise === '러닝' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🏃‍♂️ 러닝으로 심장도 튼튼하게, 기분도 상쾌하게!
          </Text>
        </View>
      )}
      {cleanExercise === '사이클' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🚴‍♀️ 사이클로 하체 근력과 심폐 지구력을 동시에!
          </Text>
        </View>
      )}
      {cleanExercise === '스쿼트' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🏋️‍♂️ 스쿼트로 탄탄한 하체와 코어를 완성하세요!
          </Text>
        </View>
      )}
      {cleanExercise === '플랭크' && (
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>
            🧘‍♂️ 플랭크로 코어 근력과 자세 교정 효과를 누리세요!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFF1',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  box: {
    backgroundColor: '#CFF7FC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  illustration: {
    marginTop: 10,
    alignItems: 'center',
  },
  illustrationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginTop: 30,
  },
});