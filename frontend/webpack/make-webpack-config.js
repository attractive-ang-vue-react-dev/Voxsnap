'use strict';

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');

const ROOT_PATH = path.resolve(__dirname, '../');
const SOURCE_PATH = path.resolve(ROOT_PATH, 'src');
const NODE_MODULES_PATH = process.env.NODE_MODULES_PATH || path.resolve(ROOT_PATH, 'node_modules');
const BUNDLES_PATH = path.join(ROOT_PATH, 'bundles/');

module.exports = (options) => {
    const config = {};
    const _OUTPUT = {
        path: BUNDLES_PATH,
        filename: options.dev ? 'bundle-[name].js' : 'bundle-latest.js',
        // publicPath: '/bundles/'
    };

    if (options.dev) {
         // referencing localhost without port because of traefik
        _OUTPUT['publicPath'] = 'http://localhost:4000/bundles/';
        //_OUTPUT['publicPath'] = 'http://localhost:8000/static/';
    } else {
        _OUTPUT['publicPath'] = 'https://cdn.voxsnap.com/v2/react/';
    }

    const plugins = [];
    const rules = [];

    const extractSass = new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'bundle.css',
        //chunkFilename: options.dev ? '[id].css' : '[id].[hash].css',
      })

    if (options.dev) {
        rules.push(
            {
                test: /\.scss$/,
                exclude: NODE_MODULES_PATH,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.(es6|jsx)$/,
                exclude: NODE_MODULES_PATH,
                use: [
                    {
                        loader: "eslint-loader"
                    }
                ]
            }
        );
    } else {
        rules.push({
            test: /\.(sa|sc|c)ss$/,
            exclude: NODE_MODULES_PATH,
            use: [
                options.dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        });
    }

    if (options.generateStats) {
        plugins.push(new BundleTracker({path: 'webpack', filename: 'webpack-stats.json'}));
    }

    if (options.hotReloading) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        config.devtool = 'eval-source-map';
        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 4000,
            public: 'localhost:4000',
            host: '0.0.0.0', //accessible from anywhere
            headers: {'Access-Control-Allow-Origin': '*'},
            disableHostCheck: true
        }
    }

    if (options.minimize) {
        plugins.push(
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.8
            })
        );
    }

    return merge(config, {
        entry: {
            main: [
                //'@babel/polyfill',
                path.resolve(SOURCE_PATH, 'App.jsx')
            ]
        },
        output: _OUTPUT,
        module: {
            rules: [
                {
                    test: /\.(es6|jsx)$/,
                    exclude: NODE_MODULES_PATH,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                },
                {
                    test: /\.(svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "imgs/[name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    },
                },
                {
                    test: /\.css/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        }
                    ]
                }
            ].concat(rules)
        },
        plugins: [extractSass].concat(plugins)
    })
}
