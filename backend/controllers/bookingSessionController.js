// booking session controller

const BookSession = require("../models/bookSession.model");
const PsychiatristDetails = require("../models/psychiatristdetail.model");
const Student = require("../models/student.model");
const StudentDetails = require("../models/studentDetails.model");
// create BookingSession
module.exports.CreateBookingSession = async (req, res)=>
{
    console.log('entering createBook Session Student')
    const studentId = req.userId;
    const role = req.role;
    if (role !== "student")
    {
        return res.status(403).json({success:false, msg:"Access denied: Only students can create booking sessions"});
    };

    const {sessionId, psychiatristId,  status}  = req.body;

    if (!sessionId || !studentId || !psychiatristId || !status)
    {
        // console.log(`${sessionId}\n ${studentId}\n ${psychiatristId}\n ${status}`);
        return res.status(400).json({success:false, msg:"Invalid parameters"});
    }
    try
    {
        const studentDetails = await StudentDetails.findOne({studentId: studentId})
        const new_booking_session = await BookSession.create({sessionId:sessionId, studentId:studentId, studentDetailsInfo:studentDetails._id || "", psychiatristId:psychiatristId,  status:status});
        if (!new_booking_session)
        {
            return res.status(500).json({success:false, msg: 'Internal Server Error: booking Failed'})
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
        if (new Date(foundBooking.createdAt.getTime()) > Date.now() + (36 * 60 * 60 * 1000))
        {
            // WILL NOT PERFORM OPERATOIN IF DATE is 36 hours to session
            return res.status(200).json({success:false, msg:"Cannot delete session: 36 hours to"})
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
    // req.userId = decodedToken.userId;
    // req.role = decodedToken.role;
    
    const psychiatristId = req.userId;
    const userRole = req.role;

    if (!psychiatristId && userRole !== "psychiatrist")
    {
        return res.status(400).json({success:false, msg:"No psychiatristId found"});
    }
    try
    {
        const foundPsychiatristBookedSessions = await BookSession.find({psychiatristId:psychiatristId}).populate([{ path: 'studentId', select: 'studentAdmissionNum  email'} , {path:'studentDetailsInfo', select:"phoneNumber gender studentAge studentName"}, { path: 'sessionId',  select:'sessionMode date startTime endTime sessionDuration sessionType sessionStatus'}]);

        console.log('foundPsychiatristBookedSessions');
        // console.log(foundPsychiatristBookedSessions);
        // {path:'studentDetailsInfo', select:"phoneNumber gender studentAge studentName"}

        // StudentDetails.find({})
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
    // const id = decodedToken.userId;
    // req.userId = id;
    // req.role = decodedToken.role;
    const id = req.userId;
    const role  = req.role;
    const studentId = id;

    if (role !== "student")
    {
        return res.status(403).json({success:false, msg:"Access denied: Only students can view their booked sessions"});
    }

    try
    {
        // check is student exist first
        const foundStudentId = await Student.findById({_id:studentId});
        if (!foundStudentId)
        {
            return res.status(404).json({success:false, msg:"Student not found"});
        }
        const foundStudentBookedSessions = await BookSession.find({studentId:studentId}).populate([{path: 'psychiatristId', select:"fullName specialization"}, {path: 'sessionId', select: 'sessionType date startTime endTime sessionMode sessionDuration sessionDuration'}] );
        if (foundStudentBookedSessions.length == 0)
        {
            return res.status(200).json({success:true, msg:"You have no booked sessions"});
        }
        // console.log('found student booked sessions'); // after using cookies for auth
        // console.log(foundStudentBookedSessions);
        // get psychiatristId from booked sessions
        const psychIds = [ ...new Set(foundStudentBookedSessions.map((sessionInfo)=>{return sessionInfo.psychiatristId._id}))];

        // console.log('psych Ids');
        // console.log(psychIds); // I can confirm that i get an array of [ { _id: new ObjectId('692bbcb9946ace680fc7e177') } ]
        // get psychiatrist details for each booked session
        const psychDetails = await PsychiatristDetails.find({psychiatristId:{$in:psychIds}}).select('fullName psychiatristId specilization');
        // console.log('psychDetails');
        // console.log(psychDetails);
        /*
        [
            {
                _id: new ObjectId('6939c45d446162c08bb9b3da'),
                psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
                fullName: 'Dr. Michael Chen',
                specilization: 'Depression & Anxiety'
            }
        ]
        */
        const psychDetailsMap = {}

        psychDetails.forEach((detail)=>{
            // console.log('detail.psychiatristId.toString()');
            // console.log(detail.psychiatristId.toString());
            // console.log('detail.fullName');
            // console.log(detail.fullName);
            // console.log('detail.specilization');
            // console.log(detail.specilization);

            psychDetailsMap[detail.psychiatristId.toString()]  = {
                fullName: detail.fullName,
                specialization:detail.specilization
            }
        })

        // console.log('psychDetailsMap');
        // console.log(psychDetailsMap);

        // to return booked session
        const studentBookedSession = foundStudentBookedSessions.map((session)=>{
            // get DETAILS based on psychDetails Id
            // console.log('session.psychiatristId._id');
            // console.log(session.psychiatristId._id);

            // console.log('session.psychiatristId._id.toString()');
            // console.log(session.psychiatristId._id.toString());

            const detail  = psychDetailsMap[session.psychiatristId._id.toString()] || {}; // this will return the given values:fullName,specilization based on psychId
            return {
                ...session.toObject(),
                fullName: detail.fullName,
                specilization: detail.specialization
            }
        });
        // console.log("studentBookedSession");
        // console.log(studentBookedSession);
        return res.status(200).json({success:true, data:studentBookedSession} );
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }   
}