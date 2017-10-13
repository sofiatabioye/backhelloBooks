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

export const forgotPassword = (email, header, token) => ({
    from: 'HelloBooks@noreply.com',
    to: email,
    subject: 'HelloBooks Password Reset',
    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://'}${header}/api/v1/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
});

export const resetPassword = email => ({
    to: email,
    from: 'passwordreset@demo.com',
    subject: 'Your password has been changed',
    text: `${'Hello,\n\n' +
          'This is a confirmation that the password for your account '}${email} has just been changed.\n`
});


export const lateReturn = (email, expectedReturnDate) => ({
    from: 'HelloBooks@noreply.com',
    to: email,
    subject: 'Book Surchage from HelloBooks',
    text: `${'You are receiving this because you did not return this book in time.\n\n' +
          'You were expected to return this book on '}${expectedReturnDate}` +
          ` as expected. \n Therefore, you have to pay a sum of $50 as fine before you are able to borrow or read books on hellobooks.\n`
});

