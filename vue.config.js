/*
 * @Author: yuechu
 * @Date: 2021-02-22 18:46:00
 * @LastEditors: yuechu
 * @LastEditTime: 2021-03-04 10:51:14
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const chalk = require('chalk')
const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const currentEnv = require('./utils/getEnv')()
const TerserPlugin = require('terser-webpack-plugin')

// 仅支持输入 mock/dev/test/pre/prod 五个环境参数，否则终止运行
if (currentEnv && ['mock', 'dev', 'test', 'pre', 'prod'].indexOf(currentEnv) < 0) {
  console.log('\n')
  console.log(`🦄 ${chalk.yellow.bold('仅支持以下环境: mock/dev/test/pre/prod')}`)
  if (process.env.NODE_ENV === 'development') {
    console.log(`🦄 ${chalk.yellow.bold('本地开发运行示例👉: npm run dev:dev OR npm run dev --env=dev')}`)
  } else {
    console.log(`🦄 ${chalk.yellow.bold('打包构建运行示例👉: npm run build:prod OR npm run build --env=prod')}`)
  }
  console.log('\n')
}

// 获取后端远程联调环境(dev/test/pre/prod)接口地址
function getApi () {
  if (currentEnv === 'mock') {
    return
  }

  const configInfo = require(`./config/${currentEnv}.env`)
  return configInfo.API_URL
}

console.log('\n')
console.log(`🦄 ${chalk.yellow.bold('the NODE_ENV is: ' + `${process.env.NODE_ENV}`)}`)
console.log(`🦄 ${chalk.yellow.bold('the env is: ' + `${currentEnv}`)}`)
console.log(`🦄 ${chalk.yellow.bold('the request api is: ' + `${getApi()}`)}`)
console.log('\n')

module.exports = {
  // Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  // zhengkai.blog.csdn.net
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  publicPath: '/', // process.env.BASE_URL拿到的值
  assetsDir: 'static',
  devServer: {
    open: true
  },
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true
    } : false // 禁用css打包顺序检查
  },
  // 通过cdn引入的资源，配置externals可全局引入
  configureWebpack: {
    externals: {
      trun: 'turn',
      jquery: 'jQuery'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'] // 省略后缀名
    },
    performance: {
      maxEntrypointSize: 1000000, // 入口起点最大体积
      maxAssetSize: 1000000 // 单个资源体积
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 打包环境去掉console
            } 
          } 
        })
      ]
    }
  },
  // 自定义 webpack 配置
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    // 关闭prefetch功能
    config.plugins.delete('prefetch')
    // 开启gzip压缩
    config.plugin('compressionPlugin').use(
      new CompressionPlugin({
        test: /\.(js|html|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    )
    // 图片base64转换设置
    config.module.rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/).use('url-loader')
    .loader('url-loader')
    .options({
      limit: 2048    // 图片小于2k才转为base64
    }).end()
    // 引入打包文件分析工具
    // config.plugin('webpack-bundle-analyzer').use(
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'static', // server/static/json/disabled
    //     generateStatsFile: true,
    //     statsOptions: { source: false },
    //   })
    // );
    // 注入全局变量
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        npm_config_env: JSON.stringify(currentEnv)
      })
      // 非mock环境下注入全局环境配置
      if (currentEnv !== 'mock') {
        Object.assign(definitions[0]['process.env'], {
          envConfig: JSON.stringify(require(`./config/${currentEnv}.env`))
        })
      }
      return definitions
    })
  }
}
