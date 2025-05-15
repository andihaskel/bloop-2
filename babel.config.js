module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Optimize reanimated
      'react-native-reanimated/plugin',
    ],
  };
};