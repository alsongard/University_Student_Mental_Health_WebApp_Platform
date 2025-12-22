const mongoose = require('mongoose');


const PsychiatristDetailSchema = new mongoose.Schema({
    psychiatristId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Psychatriast',
        required: true,
        unique: true
    },
    fullName : {
        type:String,
        required:true
    },
    phoneNumber: {
        type:String, 
        required:true
    },
    officeLocation: {
        type:String, 
        required:true
    },
    biography: {
        type:String,
        required:true,
    },
    specilization: {
        type:String,
        required:true,
    },
    yearsExperience: {
        type:Number,
        required:true
    },
    Education:{
        type:String,
        required:true
    },
    consultationDays: {
        type:[String],
        required:true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday"]
    },
    consultationHours: {
        type:String,
        required:true
    }, 
    notifications: {
        email: {type:Boolean, required:true},
        sms: {type:Boolean, required:true},
        alerts: {type:Boolean, required:true},
        feedbackNotif: {type:Boolean, required:true}
    }
});

const PsychiatristDetails = mongoose.model("PsychiatristDetail", PsychiatristDetailSchema);
module.exports = PsychiatristDetails;

