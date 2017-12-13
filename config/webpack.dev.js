const fCommon = require('./webpack.common.js');

const fConfig = (env, argv, options, common) => ({
  devServer: {
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
    port: 3000,
    proxy: {
      // Add backend servers here to avoid CORS restrictions
    }
  },

  // Cheaper alternative to eval-source-map, since column mappings (for inline breakpoints) are
  // broken in Chrome 62 anyway - even for the most basic standalone tsc-only or webpack-only examples.
  // Any of the "eval" options will cause thrown errors to have a different origin.
  devtool: 'cheap-module-eval-source-map',

  output: {
    filename: '[name].js'
  }
});

module.exports = (env, argv) => {
  const options = {
    devServer: argv.$0.includes('webpack-dev-server'),
  };

  const common = fCommon(env, argv, options);
  const dev = fConfig(env, argv, options, common);

  return Object.assign({}, common, dev);
};
