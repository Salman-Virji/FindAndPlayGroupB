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
            text: `<a>${text}</a>` //Is there an option for a link? Maybe a <a> tag... html: <a>Click here</a>
            //html: '<p>Click <a href="http://localhost:3000/sessions/recover/' + recovery_token + '">here</a> to reset your password</p>'
        });

        console.log("Email sent sucessfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;