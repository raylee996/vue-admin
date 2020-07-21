var path = require("path")

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src")
            }
        }
    },
    pages: {
        login: {
            entry: "src/login/main.js",
            template: "public/login.html",
            filename: "login.html",
            title: "登录"
        },
        index: {
            entry: "src/app/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "后台系统"
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://api.server.com/",
                pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        }
    }
}