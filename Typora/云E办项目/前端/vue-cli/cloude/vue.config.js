module.exports = {
    // 开启代理服务器
    devServer: {
        proxy: {
          '/': {
            // 代理目标的基础路径
            target: 'http://localhost:8081',
            pathRewrite: {"^/" : ""},
          },
          '/ws': {
            target: 'ws://localhost:8081',
            ws: true,
          },
        }
    }
}