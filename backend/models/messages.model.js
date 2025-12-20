const mongoose = require("mongoose");
// const Psychatriast = require("./physchatris.model");
// const Student = require("./user.model");


const messagesSchema = new mongoose.Schema(
    {
        senderId: { type: String, required: true },
        senderName: { type: String, required: true },
        senderRole: { type: String, required: true },
        senderAvatar: { type: String, default: "" },

        receiverId: { type: String, required: true },
        receiverName: { type: String, required: true },
        receiverRole: { type: String, required: true },
        receiverAvatar: { type: String, default: "" },
        // Message Contenct
        message:{type:String, required:true},
        image: {type:String, default: ""},

        // Metadata
        isRead: { type: Boolean, default: false },
        tempId: { type: String, default: "" },
        readAt: { type: Date },
        status:{type:String, enum:['sending', 'sent', 'delivered', 'read', 'failed'], default:'sent'},
        conversationId: { type: String, required: true}
    }, 
    {
        timestamps:true
    }
);

const Message = mongoose.model("Message", messagesSchema);
module.exports  = Message;

