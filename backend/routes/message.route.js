const express = require("express");
const {sendMessage, retrieveMessagesBtwn, retrieveUserChatPartners, getAllPsychiatrist} = require("../controllers/message.controller")
const messageRouter = express.Router();

const {getAuthenticated} = require("../middleware/auth")
// getAllContacts from psychiatrist
messageRouter.get("/getAllPsychiatrist", getAllPsychiatrist); //sidebar for all Contacts
// messageRouter.post("/sendmessage/:id", sendMessage);
messageRouter.get("/retrievemessages/:id",getAuthenticated,  retrieveMessagesBtwn);
messageRouter.get("/retrieveUserChatPartners", getAuthenticated, retrieveUserChatPartners);
// messageRouter.get("/retrieveUsers/:id", getUsers);/
module.exports = messageRouter;