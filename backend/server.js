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

// const {registerStudent} = require("./controllers/studentAuthController")
// create app:express instance
const app = express();
const httpServer = createServer(app);


const corsOption = {
    origin: function (origin, callback){
        if (process.env.NODE_ENV !== "production") // checks the environment at which t's running
        {
            // console.log(`[DEV] Allowing origin: ${origin}`)
            return callback(null, true);
        }
        if (!origin)
        {
            return callback(null,true); // remember second argument: returns true(permit domain) or false(permit domain) 
        }
        const allowedDomains = [
            "https://university-student-psychiatrist-web.vercel.app",
            "http://localhost:5173"
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
app.use("/api/psychiatristSession", psychiatristSession);
app.use("/api/studentDetails", studentRouter);
app.use("/api/bookSession",bookingRoutes );
app.use("/api/feedback", feedBackRouter);
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