import common from './webpack.common.js'
import { merge } from 'webpack-merge'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const webpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    open: ['/main.html'],
    port: 'auto',
    host: '0.0.0.0',
    hot: true,
  },
});


function webpackDev() {
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer({ ...webpackConfig.devServer }, compiler);
  const runServer = async () => {
    console.log('Starting server...');
    await devServer.start();
  };
  
  runServer()

}


export default webpackDev;