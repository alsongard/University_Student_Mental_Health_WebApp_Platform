const getAuthToken = require("../middleware/getAuthToken");
const jwt = require("jsonwebtoken");
const Message = require("../models/messages.model");
const PsychiatristDetails = require("../models/psychiatristdetail.model");
const StudentDetails = require("../models/studentDetails.model");

const sendMessage = async (data, socket,  callback)=>{
    // console.log("callback");
    // console.log(callback);
    const senderId = socket.userId;
    const userRole = socket.role;

    let senderDetails;
    let receiverDetails;

    console.log(`role: ${userRole}`);
    const message = data.text;
    const image = data.image;
    const receiverId = data.receiverId;
    const tempId = data.id; // this is used to identify the message on the client side to update the status
    // const { message, image, receiverId } = data;
    try
    {
        if (!message || message.trim() === "")
        {
            console.log("No message to send");
            // callback({
            //     status: "False", 
            //     msg: "No message to send"
            // });
        }
        // Double Check For Ids
        if (!senderId || !receiverId)
        {
            console.log("No sender or receiver Id");
            console.log(`senderId: ${senderId}, receiverId: ${receiverId}`);
            // callback({
            //     status: "False", 
            //     msg: "No sender or receiver Id"
            // });
        }
        if (senderId === receiverId)
        {
            console.log("Sender and Receiver cannot be the same");
            console.log(`senderId == receiverId : ${senderId == receiverId}`);
            // callback({
            //     status: "False", 
            //     msg: "Sender and Receiver cannot be the same"
            // });
        }
        // get details on both sender and receiver 
        if (userRole === "student") // USER LOGGED IN:SENDER
        {
            console.log("Runnin gon userRole student");
            senderDetails = await StudentDetails.findOne({studentId: senderId});
            // console.log("senderDetails");
            // console.log(senderDetails);
            if (!senderDetails)
            {
                console.log(`No Student with id: ${senderId}`);
                // return res.status(400).json({success:false, msg:`No Student with id: ${senderId}`});
            }
            // we know it's psychiatrist
            receiverDetails = await PsychiatristDetails.findOne({psychiatristId: receiverId});
            // console.log("receiverDetails");
            // console.log(receiverDetails);
            if (!receiverDetails)
            {
                console.log(`No Psychiatrist with id: ${receiverId}`);
                // return res.status(400).json({success:false, msg:`No Psychiatrist with id: ${receiverId}`});
            }
        }
        if (userRole === "psychiatrist") // PSYCHIATRIST LOGGED IN:SENDER
        {
            console.log("Running on userRole psychiatrist");
            senderDetails = await PsychiatristDetails.findOne({psychiatristId: senderId});
            if (!senderDetails)
            {
                console.log(`No Psychiatrist with id: ${senderId}`);
                // return res.status(400).json({success:false, msg:`No Psychiatrist with id: ${senderId}`});
            }
            // we know it's student
            receiverDetails = await StudentDetails.findOne({studentId: receiverId});
            if (!receiverDetails)
            {
                console.log(`No Student with id: ${receiverId}`);
                // return res.status(400).json({success:false, msg:`No Student with id: ${receiverId}`});
            }
        };
        const sortedIds = [senderId, receiverId].sort();
        const combined = `conv_${sortedIds[0]}_${sortedIds[1]}`;

        if (!senderDetails || !receiverDetails)
        {
            console.log("Cannot create Message - missing details");
        }
        const newMessage = await Message.create({
            senderId: senderId,
            senderName:userRole == "student" ? senderDetails.studentName : senderDetails.fullName,
            senderRole: userRole,
            senderAvatar: "", // to be implemented later
            receiverId: receiverId,
            receiverName: userRole == "student" ? receiverDetails.fullName : receiverDetails.studentName, // REVERSE LOGIC: student is sender --> reciever is Pschiatrist: fullName (viceversa)
            receiverRole: userRole == "student" ? "pschiatrist" : "student",
            receiverAvatar: "", // to be implemented later
            message: message,
            image: image || "",
            conversationId: combined,
            tempId: tempId
        })
        if (newMessage)
        {
            // console.log("New Message Created:");
            // console.log(newMessage);
            socket.emit("newMessage", newMessage); // this event will be emited if message is stored then the newMessage will be displayed on the user
        }
        // perform something with SOCKETIO
        // return res.status(200).json({success:true, msg:"Message created"})

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        // callback({
        //     status: "Error", 
        //     msg: "Error: ${err}"
        // });
    }
}

const retrieveMessagesBtwn = async(req, res)=>{
    console.log("entering retrieveMessagesBtwn ");
    const receiverId = req.params.id
    // retrieve Messages based on myId and sendersId: that is in both cases we have: senderId and receiverId for both reciever and senderId
    
    try
    {   
        // having the decodedToken i can get the userId
        const senderId = req.userId;
        const messages = await Message.find({$or: [{senderId:senderId, receiverId:receiverId}, {receiverId:receiverId, senderId:senderId}]});
        // the above string retrieves the messages between the User and the Receiver
        // console.log("messages");
        // console.log(messages);

        if (messages.length == 0)
        {
            return res.status(200).json({success:true, msg:"No messages Yet"});
        }
        return res.status(200).json({success:true , msg:"Retrieved Messages", data:messages})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:failure, msg:`Error: ${err}`});
    }
}


const retrieveUserChatPartners = async (req,res)=>
{
    try
    {
        // req.userId = decodedToken.userId;
        // req.role = decodedToken.role;
        const userId = req.userId; // this is the sender
        const role = req.role;
        // const theReceiver = req.params.id;  // this is the receiver
        // console.log("userId");
        // console.log(userId);
        const messagesBtwn = await Message.find({
            $or:
            [
                {senderId: userId},
                {receiverId: userId}
            ]
        });
        // console.log("messagesBtwn");
        // console.log(messagesBtwn);

        if (messagesBtwn.length == 0)
        {
            return res.status(200).json({success:true ,msg:"No Messages Yet ", data:[]});
        }
        // this works as follows
        // if the sender is Me: return the receiverId , however if me is not senderId return senderId
        const chatPartnerIds = [...new Set(messagesBtwn.map((messageItem)=>{
            // console.log("messageItem");
            // console.log(`senderId: ${messageItem.senderId} , receiverId: ${messageItem.receiverId}`);
            return messageItem.senderId === userId ? messageItem.receiverId : messageItem.senderId 
        }))];

        // console.log('chatPartnerIds');
        // console.log(chatPartnerIds);


        // now fetch the psychiatrist Details
        if (role == "student")
        {
            const foundPsychiatristDetailsPartners = await PsychiatristDetails.find({psychiatristId: {$in: chatPartnerIds}}).select("fullName  psychiatristId specilization")
            // console.log("role is student");
            // console.log('foundPsychiatristDetailsPartners');
            // console.log(foundPsychiatristDetailsPartners);
            return res.status(200).json({success:true ,msg:"Found Chat Partners", data:foundPsychiatristDetailsPartners});
        }
        else if (role == "psychiatrist")
        {
            const foundStudentDetailsPartners = await StudentDetails.find({studentId: {$in: chatPartnerIds}}).select("studentName studentId course")
            // console.log("role is psychiatrist");
            // console.log('foundStudentDetailsPartners');
            // console.log(foundStudentDetailsPartners);
            return res.status(200).json({success:true ,msg:"Found Chat Partners", data:foundStudentDetailsPartners});
        }
        // console.log('foundPsychiatristDetailsPartners');
        // console.log(foundPsychiatristDetailsPartners);

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:failure, msg:`Error: ${err}`});
    }
}

const getAllPsychiatrist = async (req, res)=>
{
    try
    {
        const foundPsychatriast = await  PsychiatristDetails.find().select("fullName specilization");
        if (!foundPsychatriast)
        {
            return res.status(200).json({success:true, msg:"No Psychiatrist found"});
        }
        return res.status(200).json({success:true, msg:"Retrieved Psychiatrist", data:foundPsychatriast});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error: ${err}`});
    }
}

module.exports = {retrieveMessagesBtwn, getAllPsychiatrist, retrieveUserChatPartners, sendMessage}
// to send a message we require 
/**
 *  - senderId this can be acquired from the token
 *  - receiverId
 * 
 */