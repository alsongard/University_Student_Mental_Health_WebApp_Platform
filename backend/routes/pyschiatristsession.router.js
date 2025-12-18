// view session info routers for Psychiatrist
const express = require("express");

const pyschiatristSessionRouter = express.Router();
const {UpdateSession, DeleteSession, createSession ,ViewPsychiatristSession} = require("../controllers/psySessionController")

pyschiatristSessionRouter.post("/createSession",createSession);
pyschiatristSessionRouter.put("/updateSession/:sessionId", UpdateSession);
pyschiatristSessionRouter.get("/viewSession/:psychiatristId", ViewPsychiatristSession);
pyschiatristSessionRouter.delete("/deleteSession/:sessionId", DeleteSession);

// pyschiatristSessionRouter.get("/getAllSessions", GetAllSessions); 


module.exports = pyschiatristSessionRouter;