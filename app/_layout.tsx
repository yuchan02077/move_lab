// ── app/_layout.tsx ──

// ① 앱 전체에 폴리필 적용 (무조건 최상단, 컴포넌트 선언보다 앞에)
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'text-encoding';

'use client';                    // ← 폴리필 다음, 빈 줄 없이

import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
