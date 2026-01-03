const mongoose = require("mongoose");

const bookingSession = new mongoose.Schema({
    sessionId: {type:mongoose.Schema.Types.ObjectId, ref:'PsychiatristSession'},
    studentId: {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
    studentDetailsInfo: {type:mongoose.Schema.Types.ObjectId, ref:'StudentDetails'},
    psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:'Psychatriast'},
    status: {type:String, enum:[ 'scheduled', 'completed', 'cancelled'], default:'scheduled'},
    feedbackExist: {type:Boolean, default:false}
},
{
    timestamps:true
},
{
    strict:false
})

const BookSession = mongoose.model("BookSession", bookingSession);
module.exports = BookSession;