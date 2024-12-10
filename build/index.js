import devServer from './webpack.dev.js'
import build from './webpack.prod.js'

const { NODE_ENV = 'development' } = process.env;

console.log('当前环境：' + NODE_ENV)

NODE_ENV === 'development' ? devServer() : build()