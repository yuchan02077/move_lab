// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  // – Node 내장 모듈 → 브라우저/React Native 폴리필 –
  stream:       require.resolve('stream-browserify'),
  os:           require.resolve('os-browserify/browser'),
  events:       require.resolve('events'),
  http:         require.resolve('http-browserify'),
  https:        require.resolve('https-browserify'),
  crypto:       require.resolve('crypto-browserify'),
  url:          require.resolve('url/'),
  buffer:       require.resolve('buffer/'),
  net:          require.resolve('net-browserify'),
  tls:          require.resolve('tls-browserify'),
  zlib:         require.resolve('browserify-zlib'),
  util:         require.resolve('util/'),
  assert:       require.resolve('assert/'),
  querystring:  require.resolve('querystring'),
  path:         require.resolve('path-browserify'),
  vm:           require.resolve('vm-browserify'),

  // – 서버 전용 모듈 → 빈(shims/empty.js) 모듈로 치환 –
  express:      path.resolve(__dirname, 'shims/empty.js'),
  'body-parser': path.resolve(__dirname, 'shims/empty.js'),
  fs:           path.resolve(__dirname, 'shims/empty.js'),
};

module.exports = config;
