/// get All Sessions for students to view
const express = require("express");


const router = express.Router();
const {ViewSessions} = require("../controllers/psySessionController.js");
const {getStudentPassSessions, getFutureStudentSessions} = require("../controllers/bookingSessionController.js");
const {getAuthenticated} = require("../middleware/auth.js")
/**
 * @swagger
 * /api/studentSession/getAllSessions:
 *   get:
 *     summary: Retrieve a list Psychiatrist Sessions
 *     description: Retrieve a list of of Mental Health Sessions for the Student to view from the database.
 *     responses:
 *       200:
 *         description: A list of sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   currentBookings:
 *                      type: integer
 *                      description: The current number of bookings for the session.
 *                   _id:
 *                      type: string
 *                      description: The unique identifier for the session.
 *                   psychiatristId:
 *                      type: string
 *                      description: The ID of the psychiatrist conducting the session.
 *                   date:
 *                      type: string
 *                      description: The date of the session.
 *                   startTime:
 *                      type: string
 *                      description: The start time of the session.
 *                   endTime:
 *                      type: string
 *                      description: The end time of the session.
 *                   sessionType:
 *                      type: string
 *                      description: The type of session (e.g.Individual Therapy, Group Therapy, Medication Management).
 *                   sessionStatus:
 *                      type: string
 *                      description: The status of the session (e.g. Available, Booked, Pending).
 *                   sessionMode:
 *                      type: string
 *                      description: The mode of the session (e.g. In-Person, Virtual, Phone).
 *                   sessionDuration:
 *                      type: string
 *                      description: The duration of the session.
 *                   maxBookings:
 *                      type: integer
 *                      description: The maximum number of bookings allowed for the session.
 *                   fullName:
 *                      type: string
 *                      description: The full name of the psychiatrist.
 *                   specialization:
 *                      type: string
 *                      description: The specialization of the psychiatrist.
 */
router.get("/getAllSessions", ViewSessions);


router.get("/getStudentPastSessions", getAuthenticated, getStudentPassSessions);
router.get("/getStudentFutureSessions", getAuthenticated, getFutureStudentSessions);
const studentSessionRoutes = router;
module.exports = studentSessionRoutes;