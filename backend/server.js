const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("node:path");













const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.sendFile("index.html");
})



app.listen(5000, ()=>{
    console.log("Listening on port http://localhost:5000");
})