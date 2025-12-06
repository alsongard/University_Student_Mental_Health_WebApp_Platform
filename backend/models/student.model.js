const mongoose = require('mongoose');


const StudentSchema = new  mongoose.Schema({
    studentAdmissionNum : {type:String, required:true},
    email: {type:String, required:true}, // changeThis to studentEmail
    password: {type:String, required:true},
    isAccountVerified: {type:Boolean, default:false},
    role: {type:String, default:"student"},
    verifyOtp: {type:String, default:"0"},
    verifyOtpExpiresIn: {type:Number, default:0},
    resentOTP: {type:String, default:"0"},
    resetOtpExpiresIn: {type:Number, default:0}
},
{
    timestamps:true
});


const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;