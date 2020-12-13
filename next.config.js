module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    // Important: return the modified config
    return config;
  },
};
