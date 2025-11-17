const getAuthToken = require("../middleware/getAuthToken");
const jwt = require("jsonwebtoken");
const Message = require("../models/messages.model");

const sendMessage = async (req, res)=>{
    const { receiverId, message, image} = req.body;
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

module.exports = {retrieveMessagesBtwn, sendMessage}
// to send a message we require 
/**
 *  - senderId this can be acquired from the token
 *  - receiverId
 * 
 */