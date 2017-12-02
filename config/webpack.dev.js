const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
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
  devtool: 'cheap-module-eval-source-map'
});
