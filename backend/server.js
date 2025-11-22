// import neccessary modules:functions
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const path = require("node:path");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const {Server} = require("socket.io");
const {createServer} = require("node:http")
// const {registerStudent} = require("./controllers/studentAuthController")
const studentRouter = require("./routes/studentRouter")
// create app:express instance
const app = express();
const httpServer = createServer(app);


// middleware configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(cors());

// ROUTES
const authPsychatriastRouter = require("./routes/authPsychatriastRouter");
const authStudentRouter = require("./routes/authStudentRouter");

app.get("/", (req,res)=>{
    res.sendFile("index.html");
})
app.get("/api/trial", (req,res)=>{
    console.log("starting on api/trial")
    res.status(200).json({success:true, msg:"Trial working"})
})
// app.post("/api/trial/studentCreate",  registerStudent );
app.use("/api/student", authStudentRouter);
app.use("/api/psychatriast", authPsychatriastRouter);
app.use("/api/studentDetails", studentRouter);

// app.get("/student", async (req,res)=>{
//     try {
//         const users = await Student.find();
//         res.status(200).json({success:true, data:users});
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({success:false, msg:"Error fetching users"});
//     }
// });
const io  = new Server(httpServer, {
    cors: "*",
    methods: ["POST", "GET", "DELETE", "PUT"]
});



// io.on('eventName:connection') // connectionis an inbuitl event
io.on("connection", (socket)=>{
    console.log('server is listening on port 5000');
    const textSend = "message sent"
    socket.on("sendMessage",  (dataReceived, callback)=>{
        console.log(`hello this is message from user`);
        console.log(dataReceived);
        callback("Hi I am Message from backend");
    })
    let someData =""
    // Support Team
    socket.emit("supportTeam", someData, (response)=>{

    })
})



const serverStart  =  async()=>
{
    try
    {
        connectDB();
        // LISTENING 
        httpServer.listen(5000, ()=>{
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