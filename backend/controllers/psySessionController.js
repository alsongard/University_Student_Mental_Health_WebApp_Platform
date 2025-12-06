const PsychiatristSession = require("../models/psychiatristSession.model")

// createSession Controller
module.exports.createSession = async (req, res)=>{
    const {psychiatristId, date,  startTime, endTime, sessionType, sessionMode, sessionDuration, maxBookings, sessionStatus} = req.body;
    if (!psychiatristId || !date || !startTime || !endTime || !sessionDuration || !sessionType || !sessionMode || !sessionDuration ) {
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
    console.log(`${psychiatristId}\n ${date}\  ${startTime}\n ${endTime}\n ${sessionType}\n ${sessionMode}\n ${sessionDuration}`)
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
    const {psychiatristId} = req.params;
    try
    {
        const foundPsychiatricSessions = await PsychiatristSession.find({psychiatristId:psychiatristId});
        console.log(typeof(foundPsychiatricSessions)); // 
        return res.status(200).json({success:true , data:foundPsychiatricSessions});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})      
    }
}

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
        const allSessions = await PsychiatristSession.find().select("-psychiatristId"); // retrieve allSessions
        // check the length
        if (allSessions.length === 0)
        {
            return res.status(200).json({success:true, msg:"No available session yet"});
        }
        return res.status(200).json({success:true, data:allSessions});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error!"})      
    }
}

