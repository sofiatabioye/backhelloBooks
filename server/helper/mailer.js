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


export default smtpTransport;
