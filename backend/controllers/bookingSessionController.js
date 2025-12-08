// booking session controller

const BookSession = require("../models/bookSession.model");
const Student = require("../models/student.model");
// create BookingSession
module.exports.CreateBookingSession = async (req, res)=>{
    const {id} = req.params;
    console.log('entering createBook Session Student')
    const studentId = id;
    const {sessionId, psychiatristId,  status}  = req.body;

    if (!sessionId || !studentId || !psychiatristId || !status)
    {
        console.log(`${sessionId}\n ${studentId}\n ${psychiatristId}\n ${status}`);
        return res.status(400).json({success:false, msg:"Invalid parameters"});
    }
    try
    {
        const new_booking_session = await BookSession.create({sessionId:sessionId, studentId:studentId,  psychiatristId:psychiatristId,  status:status});
        if (!new_booking_session)
        {
            return res.status(500).json({success:false, msg: 'Internal Server Error: booking Failed '})
        }
        return res.status(201).json({success:true, msg:"Booking session created", data:new_booking_session});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }
}

// delete Booking Session : only performed by Student
module.exports.DeleteBookingSession = async (req, res)=>{
    const {bookingId} = req.params;
    try
    {
        const foundBooking = await BookSession.findById({id:bookingId});
        if (!foundBooking)
        {
            return res.status(404).json({success})
        }
        const deletedBooking = await BookSession.findByIdAndDelete({_id:bookingId});
        return res.status(200).json({success:true, msg:'Deleted SuccessFully'})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }   
};


// get  Booked Session For Psychiatrist
module.exports.ViewPsychiatristSession  = async (req,res)=>{
    const {psychiatristId} = req.params;
    if (!psychiatristId)
    {
        return res.status(400).json({success:false, msg:"No psychiatristId found"});
    }
    try
    {
        const foundPsychiatristBookedSessions = await BookSession.find({psychiatristId:psychiatristId}).populate([{ path: 'studentId', select: 'studentName studentAdmissionNum  email'}, { path: 'sessionId',  select:'sessionMode date startTime endTime sessionDuration sessionType sessionStatus'}]);

        if (foundPsychiatristBookedSessions.length == 0)
        {
            return res.status(200).json({success:true, msg:"You have no booked sessions"});
        }
        return res.status(200).json({success:true, data:foundPsychiatristBookedSessions});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }   
}

// get StudenttBookedSessions
module.exports.ViewStudentBookedSessions  = async (req,res)=>{
    const {id} = req.params;
    const studentId = id;
    if (!studentId)
    {
        return res.status(400).json({success:false, msg:"No studentId found"});
    }
    try
    {
        // check is student exist first
        const foundStudentId = await Student.findById({_id:studentId});
        if (!foundStudentId)
        {
            return res.status(404).json({success:false, msg:"Student not found"});
        }
        const foundStudentBookedSessions = await BookSession.find({studentId:studentId}).populate([{path: 'psychiatristId', select:"psychiatristName specilization"}, {path: 'sessionId', select: 'sessionType date'}] );
        if (foundStudentBookedSessions.length == 0)
        {
            return res.status(200).json({success:true, msg:"You have no booked sessions"});
        }
        return res.status(200).json({success:true, data:foundStudentBookedSessions});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }   
}