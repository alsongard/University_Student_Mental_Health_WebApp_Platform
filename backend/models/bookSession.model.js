const mongoose = require("mongoose");

const bookingSession = new mongoose.Schema({
    sessionId: {type:mongoose.Schema.Types.ObjectId, ref:pyschiatristSession},
    studentId: {type:mongoose.Schema.Types.ObjectId, ref:Student},
    psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:PsychiatristSession},
    status: {type:String, enum:[, 'scheduled', 'completed', 'cancelled']}
}, 
{
    timestamps:true
})

const BookSession = mongoose.model("BookSession", bookingSession);
module.exports = BookSession;