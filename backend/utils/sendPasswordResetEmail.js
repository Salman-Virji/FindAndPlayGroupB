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
            // host: 'smtp.ethereal.email',
            // port: 587,
            // auth: {
            //     user: process.env.AUTH_USER,
            //     pass: process.env.AUTH_PASS,
            // },
            // tls: {
            //     // do not fail on invalid certs
            //     rejectUnauthorized: false,
            // },
            service: 'gmail',
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS
            }
        });

        let message = {
            from: 'Find and Play App <findandplay78@gmail.com>',
            to: userEmail,
            subject: 'Reset Password Request',
            text: `LINK(paste into browser):\n${resetTokenLink}`,
            html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
                    <!-- Bootstrap CSS -->
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                        crossorigin="anonymous"
                    />
                    <title>Reset Password Link</title>
            
                    <style>
                        body{
                            display: flex;
                            justify-content: center;
                            text-align: center;
                            min-height: 100vh;            
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="row justify-content-md-center">
                            <div class="col col-lg-10">
                             <img src="https://tinyurl.com/fnpemailheader" alt="email header logo">
                            </div>
                          </div>
                        <h3 class="mt-3">Here is your reset link!</h3>
                        <h3 class="m-3"><a href="${resetTokenLink}">Click to reset password now...</a></h3>
                        <p>If the link above does not work, please copy the address below and paste it into the browser.</p>
                        <p>${resetTokenLink}</p>
                        <p>Attention - The link will expire in 60 minutes.</p>
                    </div>
                </body>
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"
                ></script>
            </html>`,
        };

        /**
         * @param { Object } message - Data messege object to email.
         * @param { CallbackError } err - Will report if any error from callback.
         * @param { CallbackInformation } info - Will report transport sent info.
         */
        await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(`Error sending link - ${err.message}`);
            }

            //console.log(`Reset Email sent sucessfully: ${info.messageId}`);
            console.log(`Reset link: ${resetTokenLink}`);
        });
    } catch (error) {
        console.log(error, 'Email not sent');
    }
};

module.exports = sendPasswordResetEmail;

// PREVIOUS CODE
// const nodemailer = require("nodemailer");

// const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             //host: gmail,
//             service: "Gmail",
//             port: 587,
//             secure: true,
//             auth: {
//                 user: 'findandplay78@gmail.com',
//                 pass: 'FindAndPlay'
//             },
//         });

//         await transporter.sendMail({
//             from: 'findandplay78@gmail.com',
//             to: email,
//             subject: subject,
//             text: text
//         });

//         console.log("Email sent sucessfully");
//     } catch (error) {
//         console.log(error, "Email not sent");
//     }
// };

// module.exports = sendEmail;