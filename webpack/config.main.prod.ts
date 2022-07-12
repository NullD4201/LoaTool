/**
 * Webpack config for production electron main process
 */

import webpack from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import baseConfig from './config.base';
import webpackPaths from './webpack.paths';
import deleteSourceMaps from './delete-source-maps';

deleteSourceMaps();

const devtoolsConfig =
  process.env.DEBUG_PROD === 'true'
    ? {
        devtool: 'source-map',
      }
    : {};

const configuration: webpack.Configuration = {
  ...devtoolsConfig,

  mode: 'production',

  target: 'electron-main',

  externalsPresets: {
    electronMain: true,
  },

  entry: {
    'main-process': path.join(webpackPaths.srcMainPath, 'main-process.ts'),
  },

  output: {
    path: webpackPaths.buildMainPath,
    filename: '[name].js',
    clean: {
      keep: /renderer\//,
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
    }),
    new CopyWebpackPlugin({
      patterns: ['package.json'],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

export default merge(baseConfig, configuration);
