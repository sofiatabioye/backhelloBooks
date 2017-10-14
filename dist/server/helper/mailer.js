"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lateReturn = exports.resetPassword = exports.forgotPassword = exports.smtpTransport = undefined;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create reusable transporter object using the default SMTP transport
var smtpTransport = exports.smtpTransport = _nodemailer2.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "abisoph16@gmail.com", // generated ethereal user
        pass: "farouk14" // generated ethereal password
    }
});

var forgotPassword = exports.forgotPassword = function forgotPassword(email, header, token) {
    return {
        from: 'HelloBooks@noreply.com',
        to: email,
        subject: 'HelloBooks Password Reset',
        text: "" + ('You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://') + header + "/api/v1/reset/" + token + "\n\n" + "If you did not request this, please ignore this email and your password will remain unchanged.\n"
    };
};

var resetPassword = exports.resetPassword = function resetPassword(email) {
    return {
        to: email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: "" + ('Hello,\n\n' + 'This is a confirmation that the password for your account ') + email + " has just been changed.\n"
    };
};

var lateReturn = exports.lateReturn = function lateReturn(email, expectedReturnDate) {
    return {
        from: 'HelloBooks@noreply.com',
        to: email,
        subject: 'Book Surchage from HelloBooks',
        text: "" + ('You are receiving this because you did not return this book in time.\n\n' + 'You were expected to return this book on ') + expectedReturnDate + " as expected. \n Therefore, you have to pay a sum of $50 as fine before you are able to borrow or read books on hellobooks.\n"
    };
};