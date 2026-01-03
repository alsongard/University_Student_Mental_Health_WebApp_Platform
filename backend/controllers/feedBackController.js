const FeedBack = require("../models/feedback.model");
const BookingSession = require("../models/bookSession.model");
const PsychiatristDetails = require("../models/psychiatristdetail.model");
// feedback is based afer the session: sesssionId
module.exports.createFeedBack = async (req, res)=>
{
    const studentId = req.userId;
    const { bookingId, psychiastricId, rating, feedbackMessage,anonymity } = req.body;
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
        const foundBooking = await BookingSession.findById({_id:bookingId});
        foundBooking.feedbackExist = true;
        foundBooking.save();
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
    const studentId = req.userId; 
    const role = req.role
    if (!studentId)
    {
        return res.status(400).json({success:false, msg:"Missing parameter"});
    }
    const foundFeedBack = await FeedBack.find({studentId: studentId}).populate("bookingId", 'sessionId');

    if (!foundFeedBack)
    {
        return res.status(400).json({success:false, msg:"No Feedback at the moment"});
    }
    // pyschiatricId: { _id: new ObjectId('692bbcb9946ace680fc7e177') },
    // sessionId: new ObjectId('693c2d7f024e044c1eca3eed')
    
    const psychIds = [...new Set(foundFeedBack.map((item)=>{return item.psychiatristId._id}))];
    // console.log("psychId");
    // console.log(psychIds);


    const psychDetails = await PsychiatristDetails.find({psychiatristId:{$in:psychIds}}).select('fullName psychiatristId  specilization');

    // console.log("psychDetails")
    // console.log(psychDetails);

    const psychDetailsMap = {}


    psychDetails.forEach((detail)=>{
        // console.log('this is detail')
        // console.log(detail)
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
    // console.log("psychDetailsMap");
    // console.log(psychDetailsMap);
    // getPsychiatrist Deteails
    // foundFeedBack.bookingId.sessionId.toString()

    const foundStudentFeedBack = foundFeedBack.map((feedbackItem)=>{
            const detail = psychDetailsMap[feedbackItem.psychiatristId._id.toString()] || {}; // this will return the given values:fullName,specilization based on psychId
            return {
                ...feedbackItem.toObject(),
                fullName: detail.fullName,
                specilization: detail.specialization
            }
    })
    // console.log("foundStudentFeedback");
    // console.log(foundStudentFeedBack);
    return res.status(200).json({success:true, data:foundStudentFeedBack})
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