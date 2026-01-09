const express = require("express");

const router = express.Router()
const {getAuthenticated} = require("../middleware/auth");

const {CreateBookingSession,ViewPsychiatristSession,  DeleteBookingSession, ViewStudentBookedSessions} = require("../controllers/bookingSessionController");

router.use(getAuthenticated);

/**
 * @swagger
 * /api/bookSession/createBooking:
 *   post:
 *     summary: Create a new booking session
 *     description: Creates  a new booking session for a student with a psychiatrist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID of the session to be booked
 *               psychiatristId:
 *                 type: string
 *                 description: ID of the psychiatrist for the booking
 *               status:
 *                 type: string
 *                 description: status of the booking session
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Indicates if the booking session was created successfully
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   description: Details of the created booking session
 *       500:
 *         description: Failed to create booking session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Indicates if the booking session was created successfully
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       403:
 *         description: Failed to create booking session due to unauthorized access role is not student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Indicates if the booking session was created successfully
 *                 msg:
 *                   type: string
 *                   description: Success message
 */
router.post("/createBooking", CreateBookingSession);


router.get("/psychiatristViewBooked", getAuthenticated, ViewPsychiatristSession);

/**
 * @swagger
 * /api/bookSession/createBooking:
 *   delete:
 *     summary: Delete a  booking session
 *     description: Delete a  booking session for student.
 *     responses:
 *       200:
 *         description: Deletion Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Indicates if the booking session was deleted successfully
 *                 msg:
 *                   type: string
 *                   description: Success message
 */
router.delete("/deleteBooking/:bookingId",DeleteBookingSession );

/**
 * @swagger
 * /api/bookSession/getStudentBookedSessions:
 *   get:
 *     summary: Retrieve a list of Student Booked Sessions
 *     description: Retrieve a list of Student Booked Sessions from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: String
 *                     description: Id of the document.
 *                   sessionId:
 *                     type: Object
 *                     properties:
 *                      _id:
 *                          type: String
 *                          description: id to the session document.
 *                      date:
 *                          type: String
 *                          description: date of the session.
 *                      startTime:
 *                          type: String
 *                          description: start time of the session.
 *                      endTime:
 *                          type: String
 *                          description: end time of the session.
 *                      sessionMode:
 *                          type: String
 *                          description: mode of the session.
 *                     sessionType:
 *                          type: String
 *                          description: type of the session.
 *                   studentId:
 *                      type: String
 *                      description: id of the student who booked the session.  
 *                   psychiatristId:
 *                      type: Object
 *                      properties:
 *                      _id:
 *                          type: String
 *                          description: id of the psychiatrist.
 *                      fullName:
 *                          type: String
 *                          description: full name of the psychiatrist.
 *                      specialization:
 *                          type: String
 *                          description: specialization of the psychiatrist.
 *       403:
 *          description: User not authorized error
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *            properties:
 *             success:
 *              type: boolean
 *              example: false 
 *       404:
 *          description: Resource not found error
 *       500:
 *        description: Server error
 */
router.get("/getStudentBookedSessions", ViewStudentBookedSessions); // this returns all the student sessions: both past, present and future

const bookingRoutes = router;
module.exports = bookingRoutes;