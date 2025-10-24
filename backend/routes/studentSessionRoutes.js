/// get All Sessions for students to view
const express = require("express");


const router = express.Router();
const {ViewSessions} = require("../controllers/psySessionController.js");

router.get("/getAllSessions", ViewSessions);
