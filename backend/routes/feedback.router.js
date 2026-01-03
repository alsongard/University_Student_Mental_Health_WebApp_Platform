const express = require("express");

const feedBackRouter = express.Router();
const {createFeedBack, getStudentFeedBack} = require("../controllers/feedBackController");
const { getAuthenticated } = require("../middleware/auth");
feedBackRouter.post("/createFeedback",getAuthenticated, createFeedBack);
feedBackRouter.get("/getStudentFeedback",getAuthenticated,  getStudentFeedBack);

    


module.exports = feedBackRouter;