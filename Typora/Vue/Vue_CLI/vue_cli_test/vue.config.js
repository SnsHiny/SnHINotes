module.exports = {
    // 开启代理服务器（方法一），缺点：不能灵活控制是否走代理；不能配置多个代理服务器
    // devServer: {
    //   proxy: 'http://localhost:5000'
    // },

    // 开启代理服务器（方法二），可以灵活控制是否走代理；可以配置多个代理服务器
    // devServer: {
    devServer: {
        proxy: {
          // 匹配所有以“SnHI1”开头的请求路径
          '/SnHI1': {
            // 代理目标的基础路径
            target: 'http://localhost:5000',
            // 重写路径（匹配所有路径中的/SnHI1转换为空）
            pathRewrite: {"^/SnHI1" : ""},
            // 支持webSocket（默认为true）
            ws: true,
            // 用于控制请求头中的host值，为true则代理服务器的host值为目标路径的host值；为false则为请求路径的host值（默认为true）
            changeOrigin: true
          },
          '/SnHI2': {
            target: 'http://localhost:5001',
            pathRewrite: {"^/SnHI2" : ""},
            ws: true,
            changeOrigin: true
          },
        }
    }
  }