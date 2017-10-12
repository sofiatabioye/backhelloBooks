import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
export const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "abisoph16@gmail.com", // generated ethereal user
        pass: "farouk14" // generated ethereal password
    }
});

// setup e-mail data with unicode symbols
export const mailOptions = {
    from: '"abisoph16@gmail.com', // sender address
    to: 'abisoph16@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};
