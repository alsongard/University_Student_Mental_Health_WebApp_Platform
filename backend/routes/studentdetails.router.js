const express = require('express');
const { createStudentDetails, handleFileUpload, getStudentDetails } = require('../controllers/studentController');
const { getAuthenticated } = require('../middleware/auth');
const studentRouter = express.Router();



studentRouter.post('/createDetails', getAuthenticated, createStudentDetails); // this is temporary we will need to change this
studentRouter.get('/getStudentDetails',getAuthenticated, getStudentDetails);
// studentRouter.post("/trialUpload", handleFileUpload);
module.exports = studentRouter;