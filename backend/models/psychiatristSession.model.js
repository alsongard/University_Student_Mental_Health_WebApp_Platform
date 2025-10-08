const mongoose = require("mongoose");


const pyschiatristSession = new mongoose.Schema({
    psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:Psychatriast, required:true},
    date:{type:Date , required:true},
    startTime: {type:String, required:true},
    endTime: {type:String, required:true},
    sessionType: {type:String, enum:["one-on-one", "group sessions"], default:true},
    sessionStatus: {type:String, enum:["Available", "Booked"], required:true}
});


const PsychiatristSession = mongoose.model("PsychiatristSession", pyschiatristSession);

module.exports = PsychiatristSession;
