// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path');
const glob = require('glob');
const fs = require('fs')

// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];
// CDN外链，会插入到index.html中

// 统一配置多页
function muliti() {
    const pages = {};
    glob.sync('./src/entries/**/main.js').forEach(path => {
        const chunk = path.split('./src/entries/')[1].split('/main.js')[0];//设置名称
        pages[chunk] = {
            entry: `src/entries/${chunk}/main.js`,
            template: `public/${chunk}.html`,
            filename: `${chunk}.html`,
            chunks: ['chunk-common', `${chunk}`]
        }
    });
    console.log('构建开始啦......................');
    return pages
}


module.exports = {
    // baseUrl: './', // 基本路径
    outputDir: 'dist', // 输出文件目录
    lintOnSave: false,
    pages: muliti(),
	css: {
	    loaderOptions: {
	      less: {
	        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
	        lessOptions: {
	          modifyVars: {
	            // 直接覆盖变量
	            'text-color': '#111',
	            'border-color': '#eee',
	            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
	            hack: `true; @import "vant/lib/index.less";`,
	          },
	        },
	      },
	    },
	  },
    // 配置merge
    configureWebpack: config => {
        //开启vs-code Debugger for Chrome
        //config.devtool = 'source-map';
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `fanwenqiang.${packageName.replace('@', '')}`;
                        }
                    },
                }
            }
        };
        //Gzip压缩
    },
    runtimeCompiler: true,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 9999,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                //正式环境：
                target: 'https://fspro.wx.nxmcs.com/',
                //target: 'https://fsafety.wx.nxmcs.com/',
                //本地环境：
                //target: 'http://192.168.0.125:8080/',
				pathRewrite: {"^/api" : ""},
                changeOrigin: true,
                secure: false
            },
        }, // 设置代理
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {}
};