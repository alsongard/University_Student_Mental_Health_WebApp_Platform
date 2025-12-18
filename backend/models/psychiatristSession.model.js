const mongoose = require("mongoose");

const pyschiatristSession = new mongoose.Schema(
    {
        psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:'Psychatriast', required:true},  // USING THIS ID YOU CAN GET PSYCH DETAILS OR PSYCHID INFO
        date:{type:Date , required:true},
        startTime: {type:String, required:true},
        endTime: {type:String, required:true},
        sessionMode: {type:String, enum:['In-Person', "Virtual", "Phone"], required:true}, 
        sessionDuration: {type:String, required:true},
        sessionType: {type:String, enum:["Individual Therapy", "Group Therapy", "Medication Management", "Follow-up Session", "Initial Consultation"], default:true},
        sessionStatus: {type:String, default:"Available", enum:["Available", "Booked", "Pending"]},
        currentBookings: {type:Number, default:0},
        maxBookings: {type:Number, default:1, required:true}
    }, 
    {
        timestamps: true
    }
);


const PsychiatristSession = mongoose.model("PsychiatristSession", pyschiatristSession);

module.exports = PsychiatristSession;
