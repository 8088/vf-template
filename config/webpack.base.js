const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        // vf: ['@vf.js/launcher', '@vf.js/vf', '@vf.js/gui'],
        app: path.resolve(__dirname, '../src/Main.ts'),
    },
    module: {
        rules: [
            {
                test: /\.(frag|vert|glsl)$/,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(mp3|svg|png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].[chunkhash].js',
        library: ['vf', 'gui', 'module'],
        libraryTarget: "umd",
        path: path.resolve(__dirname, '../dist/'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static/'),
                    to: path.resolve(__dirname, '../dist/'),
                    globOptions: {
                        ignore: [
                            '**/*.txt',
                            '**/*.template',
                        ],
                    },
                },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new HtmlWebpackPlugin({
            title: 'VF-Template',
            template: 'static/index.html.template',
            inject: false, // 暂不支持注入
            // hash: true,
            // showErrors: true,
            // minify: false,
        }),
    ]
};