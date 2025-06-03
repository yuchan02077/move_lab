// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Expo 런타임에는 Constants.expoConfig.extra로 들어온 환경변수가 존재해야 합니다.
const extra = Constants.expoConfig?.extra;
if (!extra) {
  throw new Error('Constants.expoConfig.extra가 정의되지 않았습니다. app.config.js를 확인하세요.');
}

const SUPABASE_URL = extra.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
