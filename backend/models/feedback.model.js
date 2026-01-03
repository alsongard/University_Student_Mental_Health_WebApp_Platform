const mongoose = require("mongoose");
const BookSession = require("./bookSession.model");
const Student = require("./student.model");
const Psychatriast = require("./physchatris.model");


const feedBackSchema = new mongoose.Schema(
    {
        bookingId: {type:mongoose.Schema.Types.ObjectId, ref:'BookSession', required:true},
        studentId: {type:mongoose.Schema.Types.ObjectId, ref:'Student', required:true},
        psychiatristId: {type:mongoose.Schema.Types.ObjectId, ref:'Psychatriast', required:true},
        rating:{type:Number, required:true, min:1, max:5},
        feedbackMessage: {type:String, required:true},
        anonymity: {type:Boolean, default:true}
    },
    {
        timestamps:true
    },
    {strict:false}
)



const FeedBack = mongoose.model("FeedBack", feedBackSchema);
module.exports = FeedBack;
