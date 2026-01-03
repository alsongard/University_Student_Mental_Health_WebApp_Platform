const Student = require("../models/student.model");
const studentDetails = require("../models/studentDetails.model");
const bookSession = require("../models/bookSession.model");
const Psychiatrist = require("../models/physchatris.model");
const PsychiatristDetail = require('../models/psychiatristdetail.model');
// # STUDENT ACTIONS
// get all students
const getAllStudents = async (req, res) => 
{
    try
    {
        const students =  await Student.find({});
        res.status(200).json({ success:true, students:students });
    }
    catch(err)
    {
        console.log(`Error getting all students: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get student details/information by id
const getStudentById = async (req, res) =>
{
    const studentId = req.params.id;
    try
    {
        const student = await Student.findById(studentId);
        if (!student)
        {
            return res.status(404).json({ success:false, message: 'Student not found' });
        }
        const details = await studentDetails.findOne({studentId:studentId});
        const foundStudent = {
            ...student, ...details
        }
        res.status(200).json({ success:true, data:foundStudent});
    }
    catch(err)
    {
        console.log(`Error getting student by id: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// update student status by Id: isAccountVerified: maybe suspension
const updateStudentStatus = async (req, res) =>
{
    const studentId = req.params.id;
    const { isAccountVerified } = req.body;
    try
    {
        const student = await Student.findById(studentId);
        if (!student)
        {
            return res.status(404).json({ success:false, message: 'Student not found' });
        }
        student.isAccountVerified = isAccountVerified;
        await student.save();
        res.status(200).json({ success:true, message: 'Student status updated successfully' });
    }
    catch(err)
    {
        console.log(`Error updating student status: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// delete student by id
const deleteStudent = async (req, res) =>
{
    const studentId = req.params.id;
    try
    {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student)
        {
            return res.status(404).json({ success:false, message: 'Student not found' });
        }
        await studentDetails.findOneAndDelete({studentId:studentId});
        res.status(200).json({ success:true, message: 'Student deleted successfully' });
    }
    catch(err)
    {
        console.log(`Error deleting student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get all sessions for the student by id
const getSessionsForStudent = async (req, res) =>
{
    const studentId = req.params.id;
    try
    {
        const foundBookedSessions = await bookSession.find({studentId:studentId});
        if (foundBookedSessions.length == 0)
        {
            return res.status(200).json({success:true, msg:'no booked sessions', data:[]})
        }
        return res.status(200).json({success:true, msg:'student booked sessions found', data:foundBookedSessions});
    }
    catch(err)
    {
        console.log(`Error getting sessions for student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// # PSYCHIATRIST ACTIONS

// get all Psychiatrists
const getAllPsychiatrist = async (req,res)=>
{
    try
    {
        const foundPsychiatrist = await Psychiatrist.find()
        if (foundPsychiatrist.length == 0)
        {
            return res.status(200).json({success:true, msg:'no psychiatrist found ', data:[]})
        }
        return res.status(200).json({success:true, msg:'no psychiatrist found ', data:foundPsychiatrist})

    }
    catch(err)
    {
        console.log(`Error getting sessions for student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// create psychiatrist account

const getPsychiatristById = async (req, res)=>
{
    const psychId = req.params.id
    try
    {
        const foundPsychiatrist = await Psychiatrist.findById({_id:psychId})
        if (foundPsychiatrist.length == 0)
        {
            return res.status(200).json({success:true, msg:'no psychiatrist found ', data:[]})
        }
        return res.status(200).json({success:true, msg:'no psychiatrist found ', data:foundPsychiatrist})

    }
    catch(err)
    {
        console.log(`Error getting sessions for student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// get psychiatrist details by id
const getPsychiatristDetailsById = async (req,res)=>
{
    const psychId = req.params.id;
    try
    {
        const foundPsychiatristDetails = await PsychiatristDetail.findOne({psychiatristId:psychId})
    }
    catch(err)
    {
        console.log(`Error getting sessions for student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// update psychiatrist status by Id: isAccountVerfied, checkVerification: remove or approve based on actions
const updatePsychiatrist = async (req, res)=>
{
    const pyschId = req.params.id;
    try
    {
        const foundPsychiatrist = await Psychiatrist.findById({_id:pyschId});
        return 
    }
    catch(err)
    {
        console.log(`Error getting sessions for student: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// set status on psychiatrist status: isAvailable || not available



// # SESSION & APPOINTMENT MANAGEMENT ACTIONS 

// get all sessions: filter by status, search functionality for psychiatrist

// get sessions for psychiatrist by id

