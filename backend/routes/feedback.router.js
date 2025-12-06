const express = require("express");

const feedBackRouter = express.Router();
const {createFeedBack, getStudentFeedBack} = require("../controllers/feedBackController");
feedBackRouter.post("/createFeedback", createFeedBack);
feedBackRouter.get("/getStudentFeedback/:studentId", getStudentFeedBack);

    


module.exports = feedBackRouter;