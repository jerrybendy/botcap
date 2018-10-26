var webpack = require('webpack')

module.exports = {
  pages: {
    main: 'src/main/main.js'
  },
  configureWebpack: {
    plugins: [
      new webpack.ExternalsPlugin('commonjs', [
        'fs',
        'desktop-capturer',
        'electron',
        'ipc',
        'ipc-renderer',
        'native-image',
        'remote',
        'web-frame',
        'clipboard',
        'crash-reporter',
        'screen',
        'shell'
      ]),
    ]
  },
  outputDir: '../app/renderer',
  productionSourceMap: false,
  baseUrl: './',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  parallel: undefined,
  css: undefined
}