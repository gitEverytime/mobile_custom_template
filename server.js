/**
 * 线上启动web服务器配置
 * @type {createApplication}
 */
var express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
var app = express();
/**
 * 线上监听的端口配置
 */
app.use(express.static("dist")).listen(9886);
// Add middleware for http proxying

/**
 * 线上CMS接口重定向配置
 * @type {HPM}
 */
var apiProxy = createProxyMiddleware('/api',
    {
        target: 'https://fspro.wx.nxmcs.com/',
		pathRewrite: {"^/api" : ""},
		changeOrigin: true
    }
);
//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/api/*', apiProxy);