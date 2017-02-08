/*
 功能：打包文件，提取公共部分，并生成带js\css引用的html页面

 打包前的文件，静态资源放在public/src下，html在views下
 打包后统一放在public/dist里

 使用的node模块：path、glob
 使用的webpack插件：commonsPlugin   ExtractTextPlugin   HtmlWebpackPlugin

 网上有说开启webpack观察者模式会导致内存占用过高，可以用gulp调用webpack的方式解决
 但是貌似这个项目并没有这种问题~
 */

/**************************引入webpack***********************************/
var webpack = require('webpack');
/**************************引入node模块path*******************************/
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    //入口文件，这里循环所有入口文件，不需要每个都写出来
    entry: {
        main:"./src/js/entry.js",
        common:["./src/js/common/common.js"],
        vendor: ['react', 'react-dom','react-router']
    },
    output: {
        //打包文件存放的绝对路径，html、css、js都会按这个路径打包
        path: "dist/",
        //网站运行时的访问路径，不设置的话，打包出的html中的默认引用的路径会是相对路径
        // publicPath: "/public/dist/",
        //打包后的文件名
        filename: 'js/[name].js'
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:9090
    },
    resolve: {
        //require文件的时候不需要写后缀了，可以自动补全
        extensions: ['', '.js', '.jsx','.css'],
        root: [
            path.resolve('./node_modules')
        ]
    },
    module: {
        loaders: [//定义一系列加载器
            {test: /\.html$/,loader: "html"},  /*html*/
            {test: /\.js$/, loader: "babel?presets[]=react,presets[]=es2015",exclude:path.resolve(__dirname,"node_modules")},      /*es6 to es5*/
            {test: /\.jsx$/,loader: 'jsx-loader'},    /*jsx to js,es5 to es6*/
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},                      /*css to css*/
            {test: /\.(jpg|png)(\?\S*)?$/i, loader: "url?limit=8192&name=image/[name][hash].[ext]"},  //limit=8192表示图片大小单位是k  小于这个值走内联大于这个值走外联             /*images 打包*/
            {test: /\.scss/, loader: ExtractTextPlugin.extract('style', 'css!sass')}                /*sass to css*/
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor"
        }),
        new ExtractTextPlugin("css/[name].css")
    ],
    watch: true //开启观察者模式
};






