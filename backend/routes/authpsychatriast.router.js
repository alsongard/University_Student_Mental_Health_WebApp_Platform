const express = require("express");
const psychatAuthRouter = express.Router();



const {medicLogin, registerMedic, getOTPUser} = require("../controllers/psychatriastAuthContoller");

psychatAuthRouter.post("/createPsychatriast", registerMedic);
psychatAuthRouter.post("/psychatriastLogin", medicLogin);
psychatAuthRouter.post("/getOtp", getOTPUser);

module.exports = psychatAuthRouter;
