import path from 'path'
import { fileURLToPath } from 'url';
import webpack from 'webpack'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { NODE_ENV = 'development' } = process.env;
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

let progressStartTime = 0




export default {
  entry: { main: path.resolve(__dirname, '../src/index.jsx') },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",  // 详见babel.config.js
        }
      },
      {
        // css 编译
        test: /\.css$/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'main.html',
      publicPath: '/'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].css',
      chunkFilename: 'css/[name]/[id].css',

    }),
    new webpack.ProgressPlugin({
      handler(percentage, message, ...args) {
        if (percentage <= 0.03) {
          progressStartTime = Date.now();
        // } else if (percentage > 0.03 && percentage < 1) {
          // console.log(`进度：${(percentage * 100).toFixed(0) + '% '}：${message}：${args.join(' ')}`) // 用于构建卡住时追踪细节 
        } else if (percentage === 1) {
          const cost = Date.now() - progressStartTime;
          process.stdout.write('\n');
          console.log(`编译完成，耗时：${cost}ms`);
        }
      },
    })

  ]
};
