const express = require("express");
const router = express.Router();

const { createFeedBack,getStudentFeedBack  } = require("../controllers/feedBackController");
router.post("/createFeedback", createFeedBack);
router.get("/getStudentFeedback/:studentId", getStudentFeedBack);


const feedBackRouter = router;
module.exports = feedBackRouter;