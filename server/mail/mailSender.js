const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASSWORD
        },
        secure: true
    }
)

const mailData = {
    from: process.env.MAIL_LOGIN,
    to: process.env.MAIL_RECIPIENT, 
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<b>Hey there! </b>< br > This is our first message sent with Nodemailer < br /> ',
}

const testSend = () => {
    transporter.sendMail(
        mailData, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(info)
            }
        }
    )
}

module.exports = {testSend}