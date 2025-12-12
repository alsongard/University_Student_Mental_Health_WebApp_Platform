const FeedBack = require("../models/feedback.model");

// feedback is based afer the session: sesssionId
module.exports.createFeedBack = async (req, res)=>{
    const {studentId, bookingId, psychiastricId, rating, feedbackMessage,anonymity } = req.body;
    if (!studentId || !bookingId || !psychiastricId || !rating || !feedbackMessage || !anonymity)
    {
        console.log('Invalid feedback Input');
        console.log(`studentId: ${studentId}\n bookingId: ${bookingId}\n psychiastricId: ${psychiastricId}\n rating: ${rating}\n feedbackMessage: ${feedbackMessage}\n anonymity: ${anonymity}`);
        return res.status(400).json({success:false, msg:'Invalid feedback Input: Missing Parameters'});
    }
    try
    {

        const new_feedback = await FeedBack.create({studentId:studentId, bookingId:bookingId, pyschiatricId:psychiastricId, rating:rating, feedbackMessage:feedbackMessage, anonymity:anonymity});
        if (!new_feedback)
        {
            return res.status(400).json({success:false, msg:"Could not create feedback"});
        }

        return res.status(201).json({success:true, msg:'New Feedback created!'});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(400).json({success:false, msg:`Error: ${err}`});
    }
    
}

// get Student feedback
module.exports.getStudentFeedBack = async (req, res)=>{
    const {studentId} = req.params;
    if (!studentId)
    {
        return res.status(400).json({success:false, msg:"Missing parameter"});
    }
    const foundFeedBack = await FeedBack.find({studentId: studentId}).populate([{path: "pyschiatricId", select:"psychiatristName"}, {path:"bookingId",  select:'sessionId'}]);
    if (!foundFeedBack)
    {
        return res.status(400).json({success:false, msg:"No Feedback at the moment"});
    }
    return res.status(200).json({success:true, data:foundFeedBack})
}


// get student Feedback for psychiatrist
module.exports.getPsychiatricFeedBack = async (req, res)=>{
    const {psychiatricId} = req.params;
    if (!psychiatricId)
    {
        return res.status(400).json({success:false, msg:"Missing parameter"});
    }
    const foundFeedBack = await FeedBack.find({pyschiatricId: psychiatricId}).populate([{ path: "studentId", select:"firstName lastName"}, {path:"bookingId",  select:'sessionId'}]);       
    if (!foundFeedBack)
    {
        return res.status(400).json({success:false, msg:"No Feedback at the moment"});
    }
    return res.status(200).json({success:true, data:foundFeedBack})
}