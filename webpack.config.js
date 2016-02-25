'use strict';

// Modules
var webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var ROOT_PATH = __dirname + '/src';

process.env.ENV = 'build'; //存储于系统环境变量中,此处模拟

var ENV = process.env.ENV;


/**
 * Webpack Config
 */
var config = {};

/**
 * 入口
 */
config.entry = {
    app:ROOT_PATH+'/scripts/app.js'
};

/**
 * 输出编译目录
 */
config.output = {
    // 编译根目录 绝对路径
    path: __dirname + '/dist',

    //相对路径
    publicPath: './',

    //编译文件  入口key值若为路径,则编译后会创建文件目录结构
    filename: ENV === 'build' ? '[name].[hash].js' : '[name].bundle.js',

    chunkFilename: ENV === 'build' ? '[name].[hash].js' : '[name].bundle.js'
};


/**
 * 开发工具
 */
if (ENV === 'test') {
    config.devtool = 'inline-source-map';
} else if (ENV === 'build') {
    config.devtool = 'source-map';
} else {
    config.devtool = 'eval-source-map';
}
config.devtool = 'eval-source-map';


/**
 * Loaders
 */

    // Initialize module
config.module = {
    preLoaders: [],
    loaders: [
        {
            //js loader 编译ES6,7
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            // CSS LOADER
            //允许JS加载 css
            //添加 postcss
            test: /\.css$/,
            loader: ENV === 'test' ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        }, {
            //资源文件 copy(仅复制 css 或者 js 中所引用的资源)
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
};

////忽略文件配置
//if (ENV === 'test') {
//    config.module.preLoaders.push({
//        test: /\.js$/,
//        exclude: [/node_modules/, /\.spec\.js$/],
//        loader: 'isparta-instrumenter'
//    })
//}

/**
 * PostCSS
 */
config.postcss = [
    autoprefixer({
        browsers: ['last 2 version']
    })
];

/**
 * Plugins
 */
config.plugins = [];

// Reference: https://github.com/ampedandwired/html-webpack-plugin
// 模板文件 注入 body
config.plugins.push(
    new HtmlWebpackPlugin({
        template: ROOT_PATH + '/index.html',
        inject: 'body'
    }),

    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // css 单独打包
    // name 为入口文件的 key
    new ExtractTextPlugin('[name].[hash].css', {disable: ENV !== 'build'})
);

// Add build specific plugins
if (ENV === 'build') {
    config.plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([{
            from: ROOT_PATH + '/asset',
            to:'asset'
        }]),
        new CopyWebpackPlugin([{
            from: ROOT_PATH + '/tmpl',
            to:'tmpl'
        }])
    )
}

/**
 * 服务器配置
 * Reference: http://webpack.github.io/docs/configuration.html#devserver
 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
 */
config.devServer = {
    contentBase: './dist',
    stats: 'minimal'
};


module.exports = config;
