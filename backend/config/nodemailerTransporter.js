const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: "gmail",
    port:465, 
    secure:true,
    auth: {
        user:process.env.GMAIL_SERVICE_APP_USER,
        pass: process.env.ANOTHER_APP_PASSWORD
    }

})

module.exports = transporter;
