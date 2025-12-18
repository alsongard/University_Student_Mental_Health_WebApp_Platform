// import neccessary modules:functions
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("node:path");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const {Server} = require("socket.io");
const {createServer} = require("node:http");
const swaggerDocument = require("./swagger.json");
const {uploadRouter} = require("./controllers/studentController")
const Message  = require("./models/messages.model");
const PsychiatristDetails =  require("./models/psychiatristdetail.model");
const StudentDetails =  require("./models/studentDetails.model");
const { getAuthenticated } = require("./middleware/auth");
const app = express();
const httpServer = createServer(app);


const corsOption = {
    origin: function (origin, callback){
        if (process.env.NODE_ENV !== "production") // checks the environment at which t's running
        {
            console.log(`[DEV] Allowing origin: ${origin}`)
            return callback(null, true);
        }
        if (!origin)
        {
            return callback(null,true); // remember second argument: returns true(permit domain) or false(permit domain) 
        }
        const allowedDomains = [
            "http://localhost:5173","https://university-student-psychiatrist-web.vercel.app"
        ]
        if (allowedDomains.includes(origin))// not equal the indexOf() method returns -1 if no value ns found in the array
        {
            return callback(null, true); // firstArgument: if we are expecting an error set this value as shown in else statemetn
            // second argument: boolean value which indeicates if the origin is allowed(true) : on not allowed(false)
        }
        else
        {
            callback(new Error(`Origin: ${origin} not allowed by cors`));
        }
    },
    methods:["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

// middleware configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(cors(corsOption));

// ROUTES
const authPsychatriastRouter = require("./routes/authpsychatriast.router");
const authStudentRouter = require("./routes/authstudent.router");
const psychiatristSession = require("./routes/pyschiatristsession.router");
const bookingRoutes = require("./routes/booking.routes");
const studentRouter = require("./routes/studentdetails.router");
const feedBackRouter = require("./routes/feedback.router");
const psychiatristDetailsRouter = require("./routes/psychiatristDetails.router");
const studentSessionRoutes = require("./routes/studentSessionRoutes");
// const 

app.get("/", (req,res)=>{
    res.sendFile("index.html");
})

const { createRouteHandler } =  require("uploadthing/express");


app.get("/api/auth/me", getAuthenticated,  (req, res)=>{
    // req.userId = decodedToken.userId;
    // req.role = decodedToken.role;
    const userId = req.userId;
    const userRole = req.role;
    console.log('Running /api/auth/me route');
    console.log(`userId: ${userId}, userRole: ${userRole}`);

    res.status(200).json({success:true, data:{id:userId, role:userRole}}); // this is for requireAuth:ProtectedRoutes:Redux
});

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: { token: process.env.UPLOADTHING_TOKEN , dev: process.env.UPLOADTHING_IS_DEV, callbackUrl: "http://localhost:5000/api/uploadthing"},
  }),
);
// app.post("/api/trial/studentCreate",  registerStudent );
app.use("/api/student", authStudentRouter);
app.use("/api/psychatriast", authPsychatriastRouter);
app.use("/api/psychiatristSession", psychiatristSession);
app.use("/api/studentDetails", studentRouter);
app.use("/api/bookSession",bookingRoutes );
app.use("/api/feedback", feedBackRouter);
app.use("/api/psychiatristDetails",psychiatristDetailsRouter);
app.use("/api/messages", require("./routes/message.route"));
app.use("/api/studentSession", studentSessionRoutes);
// swaggerdocs

var options = {
    explorer : true
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// app.get("/student", async (req,res)=>{
//     try {
//         const users = await Student.find();
//         res.status(200).json({success:true, data:users});
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({success:false, msg:"Error fetching users"});
//     }
// });

// app.get("/trialSetCookie", (req,res)=>{
//     res.cookie("trialCookie", "This is a trial cookie value", {
//         httpOnly:true,
//         secure: process.env.NODE_ENV === "production", // set to true in production
//         sameSite: "lax",
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//     });
//     res.status(200).json({success:true, msg:"Trial cookie set"});
// });

// app.get("/trialGetCookie", (req,res)=>{
//     const trialCookie = req.cookies.authToken;
//     if (trialCookie)
//     {
//         res.status(200).json({success:true, trialCookie: trialCookie});
//     }
//     else
//     {
//         res.status(404).json({success:false, msg:"No trial cookie found"});
//     }
// });



const io  = new Server(httpServer, {
    cors: ["http://localhost:5173", "https://university-student-psychiatrist-web.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"]
});


// SAVING MESSAGE TO DATABASE CAN BE DONE HERE
const saveMessageToDB = async (messageData)=>
{
    if (!messageData.senderId || !messageData.receiverId || !messageData.senderRole || !messageData.text)
    {
        console.log('Error: Missing required message data fields');
        return;
    }
    if (messageData.senderRole == "student")
    {
        console.log('Running on receiverDetails for psychiatrist');
        const recevierDetails = await  PsychiatristDetails.findOne({'psychiatristId': messageData.receiverId}).populate("psychiatristId", "role"); 
        // const recevierDetails = await  PsychiatristDetails.findOne({'psychiatristId': messageData.receiverId}); 
    
        if (!recevierDetails)
        {
            console.log(`Error: No Psychiatrist with id: ${messageData.receiverId}`);
            return;
        }
        // console.log("recevierDetails");
        // console.log(recevierDetails);
        // console.log(`Receiver Details Role: ${recevierDetails.psychiatristId.role}` );

        const response = await Message.create({
            senderId: messageData.senderId,
            receiverId: messageData.receiverId,
            receiverName: recevierDetails.fullName,
            recieverRole: recevierDetails.psychiatristId.role,
            recieverAvatar: "", // to be implemented later
            message: messageData.text
        });
        const success = "Ok";
        return success;

    }
    else if (messageData.senderRole == "psychiatrist")
    {
        console.log('Running on receiverDetails for student');
        const recevierDetails = await  StudentDetails.findOne({'studentId': messageData.receiverId});
        if (!recevierDetails)
        {
            console.log(`Error: No reciever with id: ${messageData.receiverId}`);
            return;
        }
        const response = await Message.create({
            senderId: messageData.senderId,
            receiverId: messageData.receiverId,
            receiverName: recevierDetails.studentName,
            recieverRole: messageData.senderRole == "student",
            recieverAvatar: "", // to be implemented later
            message: messageData.text
        });
        console.log((response));
        const success = "Ok";
        return success;
    }
}



// io.on('eventName:connection') // connectionis an inbuitl event
io.on("connection", (socket)=>{
    console.log('server is listening on port 5000');
    socket.on("sendMessage",  (dataReceived, callback)=>{
        console.log('=== SERVER: sendMessage event ===');
        console.log('Socket ID:', socket.id);
        console.log(`hello this is message from user `);
        console.log(dataReceived);


        if (typeof(callback) === "function")
        {
            // Save message to database
            console.log('Calling callback...');
            callback({
                status: "ok", 
                msg: "Message received at server"
            });
            console.log('Callback called successfully');
            saveMessageToDB(dataReceived);
        }
        else 
        {
            console.log('WARNING: No callback provided by client!');
        }
;
    })
    let someData =""
    // Support Team
    socket.emit("supportTeam", someData, (response)=>{

    })
});


const PORT = process.env.PORT || 5000;

const serverStart = async()=>
{
    try
    {
        connectDB();
        // LISTENING 
        httpServer.listen(PORT, ()=>{
            console.log(`Listening on port http://localhost:${PORT}`);
        });
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error: ${err}`});
    }
}


serverStart();