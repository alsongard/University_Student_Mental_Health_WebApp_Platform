const express = require("express");

const router = express.Router()


const {CreateBookingSession,ViewPsychiatristSession,  DeleteBookingSession} = require("../controllers/bookingSessionController");

router.post("/createBooking",CreateBookingSession);
router.get("/psychiatristViewBooked/:psychiatristId",ViewPsychiatristSession);
router.delete("/deleteBooking/:bookingId",DeleteBookingSession )


const bookingRoutes = router;
module.exports = bookingRoutes;