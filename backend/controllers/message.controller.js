const getAuthToken = require("../middleware/getAuthToken");
const jwt = require("jsonwebtoken");
const Message = require("../models/messages.model");
const PsychiatristDetails = require("../models/psychiatristdetail.model");

const sendMessage = async (req, res)=>{
    const receiverId = req.params.id;
    const { message, image} = req.body;
    try
    {
        const authToken = getAuthToken(req);
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    
        // having the decodedToken i can get the userId
        const senderId = decodedToken.userId;
    
        const new_message = await Message.create({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
            image:image
        })
        // perform something with SOCKETIO
        return res.status(200).json({success:true, msg:"Message created"})

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:failure, msg:`Error: ${err}`});
    }
}

const retrieveMessagesBtwn = async(req, res)=>{
    
    const receiverId = req.params.id
    // retrieve Messages based on myId and sendersId: that is in both cases we have: senderId and receiverId for both reciever and senderId
    
    try
    {
        const authToken = getAuthToken(req);
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        
        // having the decodedToken i can get the userId
        const senderId = decodedToken.userId;
        const messages = await Message.find({$or: [{senderId:senderId, receiverId:receiverId}, {receiverId:receiverId, senderId:senderId}]});
        // the above string retrieves the messages between the User and the Receiver
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
        const userId = req.user.id; // this is the sender
        // const theReceiver = req.params.id;  // this is the receiver

        const messagesBtwn = await Message.find({
            $or:
            [
                {senderId: userId},
                {receiverId: userId}
            ]
        });


        // this works as follows
        // if the sender is Me: return the receiverId , however if me is not senderId return senderId
        const chatPartnerIds = [...new Set(messagesBtwn.map((messageItem)=>{
            messageItem.senderId === userId ? messageItem.receiverId : messageItem.senderId 
        }))];

        console.log('chatPartnerIds');
        console.log(chatPartnerIds);


        // now fetch the psychiatrist Details
        const foundPsychiatristDetailsPartners = await PsychiatristDetails.find({psychiatristId: {$in: chatPartnerIds}}).select("fullName specilization")
        console.log('foundPsychiatristDetailsPartners');
        console.log(foundPsychiatristDetailsPartners);
        return res.status(200).json({success:true ,msg:"Found Chat Partners", data:foundPsychiatristDetailsPartners});

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