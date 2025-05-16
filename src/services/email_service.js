import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,      
        pass: process.env.EMAIL_PASS_APP,   
    },
});

export async function sendEmail(to, subject, html) {
    const mailOptions = {
        from: `"Ecommerce Web" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
}