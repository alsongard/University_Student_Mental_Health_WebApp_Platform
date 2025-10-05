const mongoose = require("mongoose");
const Psychatriast = require("./physchatris.model");
const Student = require("./user.model");


const messagesSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, required:true, ref: Student || Psychatriast},
    receiver: {type:mongoose.Schema.Types.ObjectId, required:true, ref: Student || Psychatriast},
    message:{type:String}
}, 
{
    timestamps:true
}
);