const mongoose = require("mongoose");
// const Psychatriast = require("./physchatris.model");
// const Student = require("./user.model");


const messagesSchema = new mongoose.Schema(
    {
        senderId:{type:String, required:true},
        receiverId: {type:String, required:true},
        receiverName: {type:String, required:true},
        recieverRole: {type:String, required:true},
        recieverAvatar: {type:String, default: ""},
        message:{type:String, required:true},
        image: {type:String, default: ""}
    }, 
    {
        timestamps:true
    }
);

const Message = mongoose.model("Message", messagesSchema);
module.exports  = Message;

