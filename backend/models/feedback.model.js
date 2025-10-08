const mongoose = require("mongoose");
const BookSession = require("./bookSession.model");
const Student = require("./student.model");
const Psychatriast = require("./physchatris.model");


const feedBackSchema = new mongoose.Schema({
    bookingId: {type:mongoose.Schema.Types.ObjectId, ref:BookSession, required:true},
    studentId: {type:mongoose.Schema.Types.ObjectId, ref:Student, required:true},
    pyschiatricId: {type:mongoose.Schema.Types.ObjectId, ref:Psychatriast, required:true},
    rating:{type:Number, required:true},
    feedbackMessage: {type:String, required:true},
    anonymity: {type:Boolean, default:True}
})



const FeedBack = mongoose.model("FeedBack", feedBackSchema);
module.exports = FeedBack;
