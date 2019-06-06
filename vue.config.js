const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://carpool.w121.guoji.biz/index.php?s=/Api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  outputDir: '../dist',
  lintOnSave: false,
  //警告 webpack 的性能提示
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'bitbug_favicon.ico',
      favicon16: 'bitbug_favicon.ico',
      appleTouchIcon: 'bitbug_favicon.ico',
      maskIcon: 'bitbug_favicon.ico',
      msTileImage: 'bitbug_favicon.ico'
    }
  }

};
