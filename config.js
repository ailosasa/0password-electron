'use strict'

const path = require('path')

let config = {
  // Name of electron app
  // Will be used in production builds
  name: '0password',

  // Use ESLint (extends `standard`)
  // Further changes can be made in `.eslintrc.js`
  eslint: true,

  // webpack-dev-server port
  port: 9080,
  devServer: {
    open: false
    // 跨域
    // proxy: {
    //   '/api': {
    //     target: 'http://49.235.114.122:8000/api/v1/auth',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       // 路径重写，
    //       '^/api': '/' // 替换target中的请求地址
    //     }
    //   }
    // }
  },

  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  building: {
    arch: 'x64',
    asar: true,
    dir: path.join(__dirname, 'app'),
    icon: path.join(__dirname, 'app/icons/logo'),
    ignore: /\b(src|index\.ejs|icons)\b/,
    out: path.join(__dirname, 'build'),
    overwrite: true,
    versionStringCompanyName: '0password',
    versionStringProductName: '0password',
    platform: process.env.PLATFORM_TARGET || 'all',
    electronDownload: {
      mirror: 'https://npm.taobao.org/mirrors/electron/'
    }
  }
}

config.building.name = config.name

module.exports = config
