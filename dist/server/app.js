'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _auth = require('./helper/auth');

var _auth2 = _interopRequireDefault(_auth);

var _checkadmin = require('./helper/checkadmin');

var _checkadmin2 = _interopRequireDefault(_checkadmin);

var _canBorrow = require('./helper/canBorrow');

var _canBorrow2 = _interopRequireDefault(_canBorrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text({ type: 'text/html' }));
app.use(_bodyParser2.default.json({ type: 'application/*+json' }));
app.use(_express2.default.static(_path2.default.join(__dirname, './client')));

// Setup a default catch-all route that sends back a welcome message in JSON format.

(0, _routes2.default)(app, _auth2.default, _checkadmin2.default, _canBorrow2.default);

app.get('/bundle.js', function (req, res) {
    res.status(200).sendFile(_path2.default.join(__dirname, '../client', 'bundle.js'));
});

app.get('*', function (req, res) {
    res.status(200).sendFile(_path2.default.join(__dirname, '../client', 'index.html'));
});

// app.get('*', (req, res) => res.status(200).send({
//     message: 'Welcome to the beginning of nothingness.',
// }));

module.exports = app;