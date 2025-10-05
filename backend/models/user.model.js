const mongoose = require('mongoose');


const StudentSchema = new  mongoose.Schema({
    studetnAdmissionNum : {type:String, required:true},
    studentName: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isAccountVerfified: {type:Boolean, default:false},
    verifyOtp: {type:Number, default:0},
    verifyOtpExpiresIn: {type:Number, default:0},
    resentOTP: {type:Number, default:0},
    resetOtpExpiresIn: {type:Number, default:0}
},
{
    timestamps:true
});


const Student = mongoose.model("User", StudentSchema);
module.exports = Student;