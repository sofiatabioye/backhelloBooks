import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack.config';
import routes from './routes';
import authorize from './helper/auth';
import checkadmin from './helper/checkadmin';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
// const compiler = webpack(webpackConfig);
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, './client')));

// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.use(webpackMiddleware(compiler));

// app.use(webpackHotMiddleware(compiler, {
//     hot: true,
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath,
// }));

routes(app, authorize, checkadmin);


app.get('/bundle.js', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client', 'bundle.js'));
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client', 'index.html'));
});


// app.get('*', (req, res) => res.status(200).send({
//     message: 'Welcome to the beginning of nothingness.',
// }));

module.exports = app;
