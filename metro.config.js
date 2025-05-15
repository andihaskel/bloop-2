const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Increase the max workers
config.maxWorkers = 4;

// Configure source and asset extensions
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

// Use the default Metro TypeScript transformer
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    // Terser options
    compress: {
      reduce_vars: true,
      inline: true,
    },
    mangle: true,
  },
};

module.exports = config;