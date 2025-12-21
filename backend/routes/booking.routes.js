const express = require("express");

const router = express.Router()
const {getAuthenticated} = require("../middleware/auth");

const {CreateBookingSession,ViewPsychiatristSession,  DeleteBookingSession, ViewStudentBookedSessions} = require("../controllers/bookingSessionController");

router.use(getAuthenticated);
router.post("/createBooking", CreateBookingSession);
router.get("/psychiatristViewBooked", getAuthenticated, ViewPsychiatristSession);
router.delete("/deleteBooking/:bookingId",DeleteBookingSession )
router.get("/getStudentBookedSessions", ViewStudentBookedSessions)

const bookingRoutes = router;
module.exports = bookingRoutes;