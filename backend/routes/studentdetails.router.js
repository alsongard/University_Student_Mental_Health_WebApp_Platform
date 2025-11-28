const express = require('express');
const { createStudentDetails, getStudentDetails } = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.post('/createDetails', createStudentDetails);
studentRouter.get('/getStudentDetails/:id', getStudentDetails);

module.exports = studentRouter;