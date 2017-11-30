const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './client/src/index.js',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/public/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: ['node_modules', 'server', 'test', 'dist'],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                },
            },
            {
                test: /\.scss$/,
                exclude: ['node_modules', 'dist'],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    }
                ],
            },
            {
                test: /\.css$/,
                exclude: /node-modules/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|png|jpg|gif)$/,
                loader: 'url-loader?limit=250000'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }

};
