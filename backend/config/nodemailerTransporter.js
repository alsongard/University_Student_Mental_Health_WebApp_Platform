const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: "gmail",
    port:465, 
    secure:true,
    auth: {
        user:'alsongadizo@gmail.com',
        pass: process.env.ANOTHER_APP_PASSWORD
    }

})

module.exports = transporter;
