const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/public/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './client/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost', // Defaults to `localhost`
        port: 8080, // Defaults to 8080
        proxy: {
            '/api/v1/*': {
                target: 'http://localhost:8000/',
                secure: false,
                changeOrigin: true,
            },
        },
    },
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
                loader: ['style-loader', 'css-loader', 'resolve-url-loader']
            },
            {
                test: /\.(woff|png|jpg|gif)$/,
                loader: 'url-loader?limit=250000'
            }
        ]
    },
    node: {
        net: 'empty',
        dns: 'empty',
    },
    devtool: 'source-map',
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
    ],
};
