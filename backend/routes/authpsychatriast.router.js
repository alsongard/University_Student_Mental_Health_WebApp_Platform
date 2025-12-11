const express = require("express");
const psychatAuthRouter = express.Router();



const {medicLogin, registerMedic, getOTPUser, getPsychiatristInfo, updatePsychiatPassword} = require("../controllers/psychatriastAuthContoller");

psychatAuthRouter.post("/createPsychatriast", registerMedic);
psychatAuthRouter.post("/psychatriastLogin", medicLogin);
psychatAuthRouter.post("/getOtp", getOTPUser);
psychatAuthRouter.get("/getpsychiatrist/:id", getPsychiatristInfo);
psychatAuthRouter.put("/updatePsychiatristPassword", updatePsychiatPassword);
module.exports = psychatAuthRouter;
