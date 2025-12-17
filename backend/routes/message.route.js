const express = require("express");
const {sendMessage, retrieveMessagesBtwn, retrieveUserChatPartners, getAllPsychiatrist} = require("../controllers/message.controller")
const messageRouter = express.Router();


// getAllContacts from psychiatrist
messageRouter.get("/getAllPsychiatrist", getAllPsychiatrist); //sidebar for all Contacts
messageRouter.post("/sendmessage/:id", sendMessage);
messageRouter.get("/retrievemessages/:id", retrieveMessagesBtwn);
messageRouter.get("/retrieveUserChatPartners/:id", retrieveUserChatPartners);
// messageRouter.get("/retrieveUsers/:id", getUsers);/
module.exports = messageRouter;