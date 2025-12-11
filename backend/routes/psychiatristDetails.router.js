// this is psychiatrist details router
const express = require("express");
const psychiatristDetailsRouter = express.Router();

const { createPsychiatristDetails, getPsychiatristDetails, updatePsychiatristDetails} = require("../controllers/psychiatristDetails.controller");

psychiatristDetailsRouter.post("/createPsychDetails", createPsychiatristDetails);
psychiatristDetailsRouter.get("/getPsychiatristDetails/:id", getPsychiatristDetails);
psychiatristDetailsRouter.put("/updatePsychiatristDetails/:id", updatePsychiatristDetails);

module.exports = psychiatristDetailsRouter;