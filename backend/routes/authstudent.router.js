const express = require("express");

const authRouter = express.Router();
const {registerStudent,studentLogin,getOTPUser,  getMe, UpdatePassword} = require("../controllers/studentAuthController")

authRouter.post("/studentCreate", registerStudent);
authRouter.post("/studentLogin", studentLogin);
authRouter.post("/getOTP", getOTPUser);
authRouter.get("/getMe", getMe);
authRouter.put("/studentChangePassword/:id", UpdatePassword);

module.exports = authRouter;
// http://localhost:5000/api/student/getMe
