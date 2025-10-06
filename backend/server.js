// import neccessary modules:functions
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("node:path");
const connectDB = require("./config/connectDB");


// create app:express instance
const app = express();


// middleware configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));



// ROUTES
const authPsychatriastRouter = require("./routes/authPsychatriastRouter");
const authStudentRouter = require("./routes/authStudentRouter");


app.get("/", (req,res)=>{
    res.sendFile("index.html");
})

app.use("/api/student", authStudentRouter);
app.use("/api/psychatriast", authPsychatriastRouter);






const  serverStart  =   async()=>
{
    try
    {

        connectDB();
        // LISTENING 
        app.listen(5000, ()=>{
            console.log("Listening on port http://localhost:5000");
        });
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error: ${err}`});
    }
}


serverStart();