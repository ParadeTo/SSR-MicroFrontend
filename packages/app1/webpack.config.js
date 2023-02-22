const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const baseConfig = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'cheap-source-map',
  mode: 'production',
  stats: {
    all: false,
    warnings: true,
    errors: true,
    errorDetails: true,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
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
  externals: [/react/, /react-dom/],
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
      // libraryTarget: 'commonjs2',
    },
  }),
  merge(baseConfig, {
    name: 'client',
    entry: './client.entry',
    output: {
      filename: 'client.js',
    },
  }),
]
