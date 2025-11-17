const express = require("express");
const {sendMessage, retrieveMessagesBtwn} = require("../controllers/message.controller")
const messageRouter = express.Router()


messageRouter.post("/sendmessage/:id", sendMessage);
messageRouter.get("/retrievemessages/:id", retrieveMessagesBtwn);

module.exports = messageRouter;