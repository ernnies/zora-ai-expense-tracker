const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: 'pre',
    include: /node_modules\/(@reown|superstruct|@apideck)/,
    loader: 'source-map-loader',
    options: {
      filterSourceMappingUrl: () => false,
    },
  })
);