const express = require("express");

const authRouter = express.Router();
const {registerStudent,studentLogin,getOTPUser} = require("../controllers/studentAuthController")

authRouter.post("/studentCreate", registerStudent);
authRouter.post("/studLogin", studentLogin);
authRouter.post("/getOTP", getOTPUser);




module.exports = authRouter;
