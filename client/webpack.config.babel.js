'use strict';
const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const debug = process.env.NODE_ENV !== 'production';
const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin()
];

export default {
  devServer: {
    compress: true,
    port: 8002,
    historyApiFallback: true
  },
  entry: [
    path.join(__dirname, 'app', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'static', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  resolve: {
    modules: [process.env.PWD, 'node_modules']
  },
  cache: false,
  devtool: debug ? 'source-map' : null,
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: debug ? '[local]__[hash:base64:5]' : '[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|woff|woff2|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, prefix: '/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: debug
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2
    }),
    new CircularDependencyPlugin({
      exclude: 'node_modules',
      failOnError: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...!debug && productionPlugins
  ]
}
