const eslint_formatter_pretty = require('eslint-formatter-pretty');
const path = require('path');
const WEBPACK = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
    entry: {
        'main': './app/js/main/index.js',
        'main-vendor': ['pseudoterminal']
    },
    output: {
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:6].js',
        publicPath: "/assets/",
        path: path.resolve(__dirname, 'dist/assets')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: [
                //     path.resolve(__dirname, 'src/app/js/main'),
                //     path.resolve(__dirname, 'node_modules/pseudoterminal'),
                // ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['syntax-dynamic-import'],
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: eslint_formatter_pretty,
                        fix: true,
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {loader: 'sass-loader', options: {sourceMap: true}},
                    ],
                    publicPath: '/'
                })
            }
        ]
    },
    plugins: [
        // 分析打包后的模块
        // new BundleAnalyzerPlugin({analyzerMode: 'static', reportFilename: 'report.html'}),

        new CleanWebpackPlugin([
            'dist/assets',
        ]),

        new WEBPACK.optimize.CommonsChunkPlugin({names: ['main-vendor']}),
        new WEBPACK.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            deepChildren: true,
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            template: 'app/tpl/index.html',
            filename: '../index.html',
            chunks: ['main-vendor', 'main']
        }),
        // new OfflinePlugin({
        //     autoUpdate: true,
        //     ServiceWorker: {
        //         output: '../sw.js'
        //     }
        // }),
        new ExtractTextPlugin(`[name].[md5:contenthash:base64:6].min.css`),
    ]
};