// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ✨ 이 한 줄이 반드시 필요합니다 ✨
      'expo-router/babel',
    ],
  };
};
