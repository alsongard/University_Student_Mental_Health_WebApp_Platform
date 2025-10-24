
// view session info routers for Psychiatrist
const express = require("express");

const router = express.Router();
const {UpdateSession, DeleteSession, createSession, ViewPsychiatristSession, DeleteSession} = require("../controllers/psySessionController")

router.post("/createSession",createSession);
router.put("/updateSession/:sessionId", UpdateSession);
router.get("/viewSession/:psychiatristId", ViewPsychiatristSession);
router.delete("/deleteSession/:sessionId", DeleteSession)