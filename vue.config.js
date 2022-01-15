module.exports = {
  lintOnSave: false, // 关闭eslint语法规范检测
  devServer: {
    overlay: {
      warnings: false,  // 关闭警告
      errors: false  // 关闭错误
    }
  },
  // 使用externals加载外部CDN资源
  chainWebpack(config) {
    // 修改webpack默认配置项
    config.when(process.env.NODE_ENV === 'production', (config) => {
      // 生产环境
      config.set('externals', {
        vue: "Vue",
        axios: "axios",
        moment: "moment",
        jquery: "jQuery"
      }),
      // 首页标题内容定制化
        config.plugin('html').tap(args => {
          args[0].isProd = true
          args[0].title = '阳光prod'
          return args
        })

    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      // 开发环境
      config.plugin('html').tap(args => {
        args[0].isProd = false
        args[0].title = '乐淘dev'
        return args
      })
    })
  }
}