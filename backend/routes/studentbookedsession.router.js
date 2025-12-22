// GET students booked sessions
const router = require("express").Router();
const {ViewStudentBookedSessions} = require("../controllers/bookingSessionController");
const {getAuthenticated} = require("../middleware/auth");

router.get("/getStudentBookedSessions/", getAuthenticated, ViewStudentBookedSessions);

const studentBookedSessionRoutes = router;
module.exports = studentBookedSessionRoutes;