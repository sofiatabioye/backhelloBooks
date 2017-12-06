const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.config');

dotenv.config();

module.exports = merge(webpackCommon, {
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node-modules/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
});
