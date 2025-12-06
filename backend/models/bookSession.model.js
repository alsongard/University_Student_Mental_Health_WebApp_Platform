const mongoose = require("mongoose");

const bookingSession = new mongoose.Schema({
    sessionId: {type:mongoose.Schema.Types.ObjectId, ref:'PsychiatristSession'},
    studentId: {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
    psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:'Psychatriast'},
    status: {type:String, enum:[ 'scheduled', 'completed', 'cancelled'], default:'scheduled'}
},
{
    timestamps:true
})

const BookSession = mongoose.model("BookSession", bookingSession);
module.exports = BookSession;