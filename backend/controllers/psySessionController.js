const PsychiatristDetails = require("../models/psychiatristdetail.model");
const PsychiatristSession = require("../models/psychiatristSession.model");
const FeedBack = require("../models/feedback.model");
const studentDetails = require("../models/studentDetails.model");
const StudentDetails = require("../models/studentDetails.model");

// createSession Controller
module.exports.createSession = async (req, res)=>
{
    const psychiatristId = req.userId;
    const {date,  startTime, endTime, sessionType, sessionMode, sessionDuration, maxBookings, sessionStatus, description} = req.body;
    if (!psychiatristId || !date || !startTime || !endTime || !sessionDuration || !sessionType || !sessionMode || !sessionDuration || !description ) {
        return res.status(400).json({error: "Invalid Input for creating session"});
    }
    try
    {
        const new_session = await PsychiatristSession.create({
            psychiatristId:psychiatristId,
            date:date,
            startTime:startTime,
            endTime:endTime,
            sessionMode:sessionMode,
            sessionDuration: sessionDuration,
            sessionType:sessionType,
            sessionStatus:sessionStatus,
            maxBookings:maxBookings,
            sessionDescription:description
        });
            
    
        if (!new_session)
        {
            console.log(`Error creating session`);
            return res.status(500).json({success:false, msg:'Internal Server Error'});
        }
        return res.status(201).json({success:true, msg:"new session created", data:new_session});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})
    }
}


// updateSession Controller
/**
 * In this we have the psychiatrist who  needs to update the session
 * we must use a session id(unqique) === ObjectId
 * 
 */
module.exports.UpdateSession = async (req, res)=>{
    const {sessionId} = req.params;
    const {psychiatristId, date,  startTime, endTime, sessionType, sessionMode, sessionDuration, maxBookings, sessionStatus} = req.body;
    // console.log(`${psychiatristId}\n ${date}\  ${startTime}\n ${endTime}\n ${sessionType}\n ${sessionMode}\n ${sessionDuration}`)
    if (!psychiatristId || !date || !startTime || !endTime || !sessionDuration || !sessionType || !sessionMode || !sessionDuration ) {
        return res.status(400).json({error: "Invalid Input for creating session"});

    }
    if (!sessionId)
    {
        return res.status(400).json({success:false, msg: "No sessionId "});
    }
    if (!psychiatristId || !date || !startTime || !endTime || !sessionType || !sessionStatus)
    {
        return res.status(400).json({success:false, msg:"Invalid parameters in update"});
    }

    try
    {

        const foundSession = await PsychiatristSession.findById({id:sessionId});
    
        if(!foundSession)
        {
            return res.status(404).json({success:false, msg:`No session found with the id: ${sessionId}`})
        }
    
        // to update we tenary operation if value is given we do the following:
    
        foundSession.psychiatristId = psychiatristId;
        foundSession.date = date;
        foundSession.startTime = startTime;
        foundSession.endTime = endTime;
        foundSession.sessionType = sessionType;
        foundSession.sessionStatus = sessionStatus;
    
        foundSession.save();
    
        const updatedFoundSession = await PsychiatristSession.findById({id:sessionId});
        return res.status(200).json({success:true, msg:"Update Success", data:updatedFoundSession});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})      
    }

}

// Delete Sessions
module.exports.DeleteSession = async (req, res)=>{
    const {sessionId} = req.params;
    if (!sessionId)
    {
        return res.status(400).json({success:false, msg: "No sessionId "});
    }
    try
    {
        const foundSession = await PsychiatristSession.findById({_id:sessionId});
        if(!foundSession)
        {
            return res.status(404).json({success:false, msg:`No session found with the id: ${sessionId}`})
        }
        const deletedSession = await PsychiatristSession.findByIdAndDelete({_id:sessionId});
        if (!deletedSession)
        {
            return res.status(500).json({success:false, msg:"Delete not successfull"});
        }
        return res.status(200).json({success:true, msg:"Deletion success"});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})      
    }
}

// ViewSessions for a specific Psychiatrist
module.exports.ViewPsychiatristSession = async (req,res)=>{
    const psychiatristId = req.userId;
    const role = req.role;
    if (!psychiatristId || !role )
    {
        return res.status(400).json({success:false, msg:"Invalid credentials"})
    }
    try
    {
        const foundPsychiatricSessions = await PsychiatristSession.find({psychiatristId:psychiatristId});
        // console.log(typeof(foundPsychiatricSessions)); // array :: 
        if (foundPsychiatricSessions.length === 0)
        {
            return res.status(200).json({success:true, msg:"No available session yet"});
        }
        return res.status(200).json({success:true , data:foundPsychiatricSessions});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})      
    }
}

// ADMIN FUNCTIONALITY : WILL BE MOVED TO ADMIN CONTROLLER LATER
module.exports.GetAllSessions = async(req, res)=>{
    try
    {
        const allSesions = await PsychiatristSession.find().populate().populate('psychiatristId' ,  'psychiatristName specilization' );;
        if (allSesions.length < 0)
        {
            return res.status(200).json({success:false, msg:"No  sessions at the moment"})
        }
        // console.log(allSesions);
        return res.status(200).json({success:true, data:allSesions})

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}

// ViewSessions for all Students
module.exports.ViewSessions = async (req, res)=>{
    try
    {
        const allSessions = await PsychiatristSession.find(); // retrieve allSessions
        // check the length
        if (allSessions.length === 0)
        {
            return res.status(200).json({success:true, msg:"No available session yet"});
        }
        // console.log("allSessions");
        // console.log(typeof(allSessions)); // array ::
        // console.log(allSessions);
        // PROCEEEDING TO USE COMBINED APPROACH
        const psychIds = [...new Set(allSessions.map((sessionItem)=>{
            return sessionItem.psychiatristId
        }))];
        
        const psychDetails = await PsychiatristDetails.find({psychiatristId:{$in:psychIds}}).select('fullName specilization psychiatristId ')
        
        console.log("psychDetails");
        // console.log(typeof(psychDetails));
        // console.log(psychDetails);
        // Get details for these psychiatrists
        /*
            psychDetails
            object
            [
            {
                _id: new ObjectId('6939c45d446162c08bb9b3da'),
                psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
                fullName: 'Dr. Michael Chen',
                specilization: 'Depression & Anxiety'
            }
            ]
        */

        // Create a map for quick lookup
        const detailsMap = {};
        psychDetails.forEach(detail => 
            {
                detailsMap[detail.psychiatristId.toString()] = {
                    fullName: detail.fullName,
                    specialization: detail.specilization
                };
            }
        );

        // console.log("detailsMap");
        // console.log(detailsMap);


        /*
        detailsMap
        {
            '692bbcb9946ace680fc7e177': { fullName: 'Dr. Michael Chen', specialization: undefined }
        }
        */
        // Combine sessions with details
        const sessionsWithDetails = allSessions.map(session => 
            {
                const detail = detailsMap[session.psychiatristId.toString()] || {}; // using psychiatristId as key for accessing values in detailsMap if not exist return empty
                return {
                    ...session.toObject(),
                    fullName: detail.fullName,
                    specialization: detail.specialization
                };
            });

        // console.log("sessionsWithDetails");
        // console.log(sessionsWithDetails);


        return res.status(200).json({success:true, data:sessionsWithDetails});

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"});
    }
}


// GET YOUR FEEDBACKS
module.exports.ViewPsychFeedBack = async (req, res)=>
{
    const psychId = req.userId;
    const role = req.role;
    // console.log(`psychId: ${psychId}\n role:${role}`);

    if (role != 'psychiatrist')
    {
        return res.status(400).json({success:false, msg:"Authentication Failed"});
    }
    try
    {
        // const foundFeedBacks = await FeedBack.find({psychiatristId:psychId}).populate('bookingId');
        const foundFeedBacks = await FeedBack.find({psychiatristId:psychId});
        // console.log("foundFeedBacks");
        // console.log(foundFeedBacks);


        // first we get unique studentId
        // const studentIds = [...new Set(foundFeedBacks.map((feedBackItem)=>{
        //     return feedBackItem.studentId
        // }))];

        // console.log("studentIds")
        // console.log(studentIds)
        // Now since we have feedbacks if anonymity is set to false we get student details
        // const foundStudentDetailsData = await StudentDetails.find({studentId:{$in:studentIds}}).select('studentName studentId')
        
        // console.log("foundStudentDetailsData");
        // console.log(foundStudentDetailsData);
;
        // Get details for these studentIds
        /*
            foundStudentDetailsData
            [
            {
                _id: new ObjectId('6930958ab9ea6134b94b7f5d'),
                studentId: new ObjectId('6903a4963253494881272acb'),
                studentName: 'Emma Watson'
            }
            ]
        */

        // Create a map for quick lookup
        // const detailsMap = {};
        // foundStudentDetailsData.forEach(detail => 
        //     {
        //         detailsMap[detail.studentId.toString()] = {
        //             name: detail.studentName,
        //         };
        //     }
        // );

        // console.log("detailsMap");
        // console.log(detailsMap);


        /*
        detailsMap
        {
            '692bbcb9946ace680fc7e177': { fullName: 'Dr. Michael Chen', specialization: undefined }
        }
        */
        // Combine sessions with details
        // const feedbackWithStudentDetails = foundFeedBacks.map(feedBackItem => 
        //     {
        //         const detail = detailsMap[feedBackItem.studentId.toString()] || {}; // using studentId as key for accessing values in detailsMap if not exist return empty
        //         return {
        //             ...feedBackItem.toObject(),
        //             fullName: detail.name,
        //         };
        //     });

        // console.log("feedbackWithStudentDetails");
        // console.log(feedbackWithStudentDetails);

        if (foundFeedBacks.length == 0)
        {
            return res.status(200).json({success:true, msg:"No feedback at the moment", data:[]});
        }
        return res.status(200).json({success:true, data:foundFeedBacks});
    }

    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"});
    }
}