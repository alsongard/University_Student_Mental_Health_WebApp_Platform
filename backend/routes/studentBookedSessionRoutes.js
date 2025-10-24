// GET students booked sessions
const router = require("express").Router();

const {ViewStudentBookedSessions} = require("../controllers/bookingSessionController");
router.get("/getStudentBookedSessions/:studentId", ViewStudentBookedSessions);

const studentBookedSessionRoutes = router;
module.exports = studentBookedSessionRoutes;