const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            //host: gmail,
            service: "Gmail",
            port: 587,
            secure: true,
            auth: {
                user: 'findandplay78@gmail.com',
                pass: 'FindAndPlay',
            },
        });

        await transporter.sendMail({
            from: 'findandplay78@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
