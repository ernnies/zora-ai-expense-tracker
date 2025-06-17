const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: 'pre',
    include: /node_modules\/(@reown|superstruct)/,
    loader: 'source-map-loader',
    options: {
      filterSourceMappingUrl: (url, resourcePath) => {
        // Skip source map parsing for problematic packages
        return false;
      },
    },
  })
);