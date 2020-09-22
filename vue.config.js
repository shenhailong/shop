/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-22 13:44:56
 */
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  productionSourceMap: false,
  css: {
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式,@使我们设置的别名,执行src目录
        prependData: '@import "~@/scss/utils/_theme.scss";'
      }
    },
  },
  transpileDependencies: [
    'element-ui'
  ],
  // 发布路径，发布到服务端需要和其他项目区分开
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer: {
    proxy: 'http://39.100.227.252:888/'
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@views', resolve('src/views'))
      .set('@components', resolve('src/components'))
      .set('@constants', resolve('src/constants'))
      .set('@config', resolve('src/config'))
      .set('@store', resolve('src/store'))
      .set('@mixin', resolve('src/mixin'))
    return config
  }
}
