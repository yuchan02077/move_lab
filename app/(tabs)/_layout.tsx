// app/_layout.tsx
import { Buffer } from 'buffer';
import 'react-native-url-polyfill/auto';
global.Buffer = Buffer;

import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
