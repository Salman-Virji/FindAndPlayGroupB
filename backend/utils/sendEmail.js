//Node.js module to allow email sending
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            //host: gmail, smpt:etherel.mail :: see https://ethereal.email/
            service: "Gmail",
            port: 587,
            secure: true,
            auth: {
                user: 'findandplay78@gmail.com',
                pass: 'FindAndPlay'
            },
        });

        await transporter.sendMail({
            from: 'findandplay78@gmail.com',
            to: email,
            subject: subject,
            text: text
        });

        console.log("Email sent sucessfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;