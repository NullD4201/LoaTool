import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import { spawn } from 'child_process';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './config.base';
import webpackPaths from './webpack.paths';

const port = process.env.PORT || 1212;

const babelConfig = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-transform-runtime',
    require.resolve('react-refresh/babel'),
  ].filter(Boolean),
};

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',

  context: path.join(webpackPaths.srcRendererPath),

  mode: 'development',

  target: 'electron-renderer',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  externalsPresets: {
    electronRenderer: true,
  },

  entry: {
    'renderer-process': path.join(
      webpackPaths.srcRendererPath,
      'renderer-process.tsx'
    ),
  },

  output: {
    filename: 'scripts/[name].js',
    path: path.join(webpackPaths.buildRendererPath),
    clean: true,
    globalObject: 'self',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: path.join('index.html'),
      template: path.join('index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== 'production',
      nodeModules: webpackPaths.srcNodeModulesPath,
    }),
  ],

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  devServer: {
    port,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: path.join(webpackPaths.srcRendererPath, 'resources'),
    },
    historyApiFallback: true,
    onBeforeSetupMiddleware() {
      // eslint-disable-next-line no-console
      console.log('Starting Main Process...');
      spawn('npm', ['run', 'start:main'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .on('close', (code: number) => process.exit(code!))
        // eslint-disable-next-line no-console
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
};

export default merge(baseConfig, configuration);
