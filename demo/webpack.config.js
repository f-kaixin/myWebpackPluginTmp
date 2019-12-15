"use strict";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const myPlugin = require('my-webpack-plugin-tmp');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "./src/main.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|test)/
            },
        ]
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
        }),
        new myPlugin({
            // 统计该插件运行时间
            showConsoleTime: true,
            // 简单的输出日志
            log: true,
            exportLog: true,
            // exportLog: {
            //     // 导出
            //     exec: true,
            //     // 导出目录
            //     path: '',
            // },
            // 写入打包后的文件
            writeFile: {
                // 执行
                exec: true,
                // 包含的文件/目录
                include: './main.js',
                // 写入数据
                data: `test12321`,
            }
        }),
    ]
};