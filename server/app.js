import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';

import routes from './routes';
import authorize from './helper/auth';
import checkadmin from './helper/checkadmin';
import canBorrow from './helper/canBorrow';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, './client')));

// Setup a default catch-all route that sends back a welcome message in JSON format.

routes(app, authorize, checkadmin, canBorrow);


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
