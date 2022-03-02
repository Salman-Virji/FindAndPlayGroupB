/**
 * NOTES
 * @summary
 * 1. Extracted the AUTH detail as it should not be public see .env, as per docs.
 * 2. Updated some of the variable names to be more descriptive.
 * 3. Updated the transporter method with text link and html too.
 * 4. Removed the subtitle param as this won't change, it's hardcoded into the function.
 * 5. Added JSDoc support for clear documentation and commenting. Ref: AirBnb or google code style guides for more info.
 *
 * Using ethreal for testing email sent
 * https://ethereal.email/login
 *
 * SNIPPET FOR TESTING
 *  tls: {
 *    // do not fail on invalid certs
 *    rejectUnauthorized: false,
 *  },
 */

/** Node.js module to allow email sending */
const nodemailer = require('nodemailer');

/** To access the .env file */
require('dotenv').config();

/**
 * @param { string } userEmail - The email of the user to send reset link to.
 * @param { string } resetTokenLink - The custom generated token link to email to users email.
 */
const sendPasswordResetEmail = async (userEmail, resetTokenLink) => {
    try {
        /** Declare setup a smpt transport provider */
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: STARTTLS,
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS,
            },
        });

        let message = {
            from: 'Find and Play App <findandplay78@gmail.com>',
            to: userEmail,
            subject: 'Reset Password Request',
            text: `<a>${resetTokenLink}</a>`,
            html: `<body>
            <h1>Here is your reset link!</h1>
                <br />
            <h2><a>${resetTokenLink}</a></h2>
            <p>Hurry, it will expire in 10 minutes</p>
            </body>`,
        };

        /**
         * @param { Object } message - Data messege object to email.
         * @param { CallbackError } err - Will report if any error from callback.
         * @param { CallbackInformation } info - Will report transport sent info.
         */
        await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(`Error sending Link - ${err.message}`);
            }

            console.log(`Reset Email sent sucessfully: ${info.messageId}`);
            console.log(`Reset Link: ${resetTokenLink}`);
        });
    } catch (error) {
        console.log(error, 'Email not sent');
    }
};

module.exports = sendPasswordResetEmail;
