/**
 * Created by zhang.futian on 2016/11/28.
 */
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");

config.entry.index.unshift("webpack-dev-server/client?http://localhost:9090");  // 将执替换js内联进去
config.entry.index.unshift("webpack/hot/only-dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    // noInfo: true,
    stats: {
        colors: true  // 用颜色标识
    },
    proxy: {
        "*": "http://localhost:9090" // 用于转发api数据，但webpack自己提供的并不太好用
    },
});
server.listen(9090);