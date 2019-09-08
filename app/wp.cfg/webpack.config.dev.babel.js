const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  DefinePlugin
} = webpack

module.exports = (env) => {
  return merge(base, {
    mode: 'development',
    devtool: /* 'cheap-module-eval-source-map' */ 'eval',
    entry: {
      hotloader: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server'
      ],
      bundle: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
    },
    output: {
      path: path.resolve(__dirname, '../dev/dist'),
      publicPath: '/loc/dist/'
    },
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, '../dev'),
      compress: true,
      historyApiFallback: true,
      proxy: {
        '/loc/api/v1': {
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:10]'
                }
              }
            }, {
              loader: 'sass-loader'
            }, {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, '../src/styles/theme.scss')
                ]
              }
            }
          ]
        }, {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/loc/dist/'
              }
            },
            {
              loader: 'css-loader'
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }]
    },
    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[id].css'
      }),
      new NoEmitOnErrorsPlugin(),
      new HotModuleReplacementPlugin(),
      // enable HMR globally
      new NamedModulesPlugin(),
      new webpack.ProvidePlugin({
        globalConfig: path.resolve(__dirname, '../env/config-dev')
      })
      // prints more readable module names in the browser console on HMR updates
    ]
  })
}