const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// gzip压缩
const CompressionPlugin = require("compression-webpack-plugin")

const DllReferencePlugin = require('webpack').DllReferencePlugin

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/speedy-view'
    : '/',
  outputDir: 'speedy-view',
  productionSourceMap: false,
  devServer: {
    open: true,
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
      new CompressionPlugin({
        test:/\.js$|\.html$|.\css/, //匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false
      }),
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('dll')
        .use(DllReferencePlugin)
        .tap(options => {
          options[0] = {
            // 上一步操作生成的manifest.json文件
            manifest: path.join(__dirname, 'dll', 'vendor.manifest.json')
          }
          return options
        })
      config
        .plugin('asset')
        .use(AddAssetHtmlPlugin)
        .tap(options => {
          options[0] = {
            filepath: path.resolve(__dirname, 'dll/*.js'),
            // dll 引用路径 线上路径/speedy-view
            publicPath: '/speedy-view/vendor',
            // dll最终输出的目录
            outputPath: './vendor'
          }
          return options
        })
        .end()
    }

  }
}
