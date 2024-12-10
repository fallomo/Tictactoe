import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import webpack from 'webpack'

const webpackConfig = merge(common, {
  mode: 'production'
});
export default function () {
  // 执行build方法，开始构建
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('编译出错')
      console.error(stats)
    } else {
      console.log('webpack 编译成功')
    }
  });
}
