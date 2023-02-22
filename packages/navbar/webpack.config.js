const webpack = require('webpack')
const path = require('path')
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const baseConfig = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'cheap-source-map',
  mode: 'development',
  stats: {
    all: false,
    warnings: true,
    errors: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          generatorOpts: {
            retainLines: true,
            compact: true,
            shouldPrintComment: (c) => /^#__PURE__$/.test(c),
          },
        },
      },
    ],
  },
}

module.exports = (_, env) => [
  merge(baseConfig, {
    name: 'server',
    target: 'node',
    entry: './server.entry',
    optimization: {
      minimize: false,
    },
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    externals: [/react/, /react-dom/],
    module: {
      rules: [
        {
          test: /\.css?$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportOnlyLocals: true,
                },
              },
            },
          ],
        },
      ],
    },
  }),
  merge(baseConfig, {
    name: 'client',
    entry: './client.entry',
    output: {
      filename: 'client.js',
      publicPath: '/navbar/dist',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [new MiniCssExtractPlugin(), new WebpackManifestPlugin()],
    module: {
      rules: [
        {
          test: /\.css?$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
  }),
]
