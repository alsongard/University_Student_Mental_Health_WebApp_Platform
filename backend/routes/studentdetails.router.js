const express = require('express');
const { createStudentDetails, getStudentDetails } = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.post('/createDetails', createStudentDetails); // this is temporary we will need to change this
studentRouter.get('/getStudentDetails/:id', getStudentDetails);

module.exports = studentRouter;