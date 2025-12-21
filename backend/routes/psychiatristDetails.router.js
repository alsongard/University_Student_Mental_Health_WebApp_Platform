// this is psychiatrist details router
const express = require("express");
const psychiatristDetailsRouter = express.Router();
const { getAuthenticated } = require("../middleware/auth");

const { createPsychiatristDetails, getPsychiatristDetails, updatePsychiatristDetails} = require("../controllers/psychiatristDetails.controller");

psychiatristDetailsRouter.post("/createPsychDetails", getAuthenticated, createPsychiatristDetails);
psychiatristDetailsRouter.get("/getPsychiatristDetails", getAuthenticated, getPsychiatristDetails);
psychiatristDetailsRouter.put("/updatePsychiatristDetails", getAuthenticated, updatePsychiatristDetails);

module.exports = psychiatristDetailsRouter;