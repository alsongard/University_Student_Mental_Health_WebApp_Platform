const mongoose = require('mongoose');


const StudentSchema = new  mongoose.Schema({
    studentAdmissionNum : {type:String, required:true},
    studentName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    gender: {type:String, enum:["Male", "Female"], required:true},
    isAccountVerified: {type:Boolean, default:false},
    verifyOtp: {type:String, default:"0"},
    verifyOtpExpiresIn: {type:Number, default:0},
    resentOTP: {type:String, default:"0"},
    resetOtpExpiresIn: {type:Number, default:0}
},
{
    timestamps:true
});


const Student = mongoose.model("User", StudentSchema);
module.exports = Student;