const mongoose = require("mongoose");

const psychiatristSchema = new mongoose.Schema({
    psychiatristId: {type:String, required:true, unique: true},
    psychatriastEmail: {type:String, required:true, unique:true},
    psychiatristPassword: {type:String, required:true},
    isAccountVerified: {type:Boolean, default:false},
    verifyOtp: {type:String, default:"0"},
    verifyOtpExpiresIn: {type:Number, default:0},
    resentOtp: {type:String, default:"0"},
    resentOtpExpiresIn:{type:Number, default:0},
    role: {type:String, enum:["psychiatrist", "Counselor"], default:'psychiatrist'}
},
{
    timestamps:true
}
);


const Psychatriast = mongoose.model("Psychatriast", psychiatristSchema);

module.exports = Psychatriast;

//     isAvailable: {type:Boolean, default:true},

