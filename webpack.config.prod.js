import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'inline-source.map',
    entry: [require.resolve('webpack-hot-middleware/client'),
        path.resolve(__dirname, './client/src/index.js')],
    target: 'web',
    output: {
        path: '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
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
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }

};
