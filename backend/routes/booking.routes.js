const express = require("express");

const router = express.Router()


const {CreateBookingSession,ViewPsychiatristSession,  DeleteBookingSession, ViewStudentBookedSessions} = require("../controllers/bookingSessionController");

router.post("/createBooking/:id",CreateBookingSession);
router.get("/psychiatristViewBooked/:psychiatristId",ViewPsychiatristSession);
router.delete("/deleteBooking/:bookingId",DeleteBookingSession )
router.get("/getStudentBookedSessions/:id", ViewStudentBookedSessions)

const bookingRoutes = router;
module.exports = bookingRoutes;