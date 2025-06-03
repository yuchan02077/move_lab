// app.config.js (CommonJS 버전)
require('dotenv').config();

module.exports = {
  expo: {
    name: 'MoveLab-App',
    slug: 'movelab-app',
    version: '1.0.0',
    // … 필요한 Expo 설정(icon, splash, sdkVersion 등) …

    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
  },
};
