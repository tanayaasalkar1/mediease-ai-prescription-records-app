//to send mail on user email when user register or for OTP
import nodemailer from 'nodemailer'


// using SMTP to send mail (Simple mail transfer protocol)
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

export default transporter;