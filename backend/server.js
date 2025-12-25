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
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');
const app = express();
const sendMessage = require("./controllers/message.controller").sendMessage;
const httpServer = createServer(app);
const multer = require('multer');
const cloudinary = require("cloudinary").v2;

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

app.get("/", (req,res)=>{
    res.sendFile("index.html");
})

// const { createRouteHandler } =  require("uploadthing/express");


app.get("/api/auth/me", getAuthenticated,  (req, res)=>{
    // req.userId = decodedToken.userId;
    // req.role = decodedToken.role;
    const userId = req.userId; // this is only used for cookies on autehentication aids in get  or post request
    const userRole = req.role;
    const email = req.email;
    console.log('Running /api/auth/me route');
    console.log(`userId: ${userId}, userRole: ${userRole}, userEmail: ${email}`);

    res.status(200).json({success:true, data:{email:email, role:userRole}}); // this is for requireAuth:ProtectedRoutes:Redux
});

// app.use(
//   "/api/uploadthing",
//   createRouteHandler({
//     router: uploadRouter,
//     config: { token: process.env.UPLOADTHING_TOKEN , dev: process.env.UPLOADTHING_IS_DEV, callbackUrl: "http://localhost:5000/api/uploadthing"},
//   }),
// );

const Storage = multer.memoryStorage();
const upload = multer({storage:Storage});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.post("/api/uploadFile",getAuthenticated, upload.array("files"), async (req, res)=>{
    console.log('this is req.files');
    // we use userId and role 
    // console.log(req.files);
    let foundDetails = null;
    try
    {

        if (req.role === "student")
        {
            console.log('user is student');
            foundDetails = await StudentDetails.findOne({studentId: req.userId});
            if (!foundDetails)
            {
                return res.status(400).json({success:false, msg:"Student not found"});
            }
            // foundDetails.image; 
        }
        else if(req.role === "psychiatrist")
        {
            console.log('user is student');
            foundDetails = await PsychiatristDetails.findOne({psychiatristId: req.userId});
            if (!foundDetails)
            {
                return res.status(400).json({success:false, msg:"Psychiatrist not found"});
            }
        }

        for (let i = 0; i < 1; i++) // DO THIS TO PREVENT MULTIPLE UPLOADS:ATTACK
        {
            const file = req.files[i];
            const result = await new Promise((resolve, reject)=>{

                const stream = cloudinary.uploader.upload_stream(
                    { // OPTIONS
                        resource_type: "auto"
                    },
                    (err, result)=>{ // CALLBACK
                        if (err)
                        {
                            console.log(`Error: An Error occures in Cloudinary Uploads`);
                            console.log(err)
                            reject(err);
                        }
                        if (result)
                        {
                            console.log(`Results after uploading`);
                            console.log(result);
                            resolve(result);
                        }
                    }
                );
                stream.end(file.buffer);
            });

            console.log(`My new result`);
            // console.log(result);
            foundDetails.image = result.url;
            console.log(`foundDetails after upload`);
            // console.log(foundDetails);
            await foundDetails.save();
            return res.status(200).json({success: true, msg:"File saved successfully"});
        }

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error: ${err}`});
    }

} )

// app.post("/api/trial/studentCreate",  registerStudent );
app.use("/api/student", authStudentRouter);
app.use("/api/psychiatrist", authPsychatriastRouter);
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

app.post("/api/logout", (req,res)=>{
    res.clearCookie("authToken");
    return res.status(200).json({success:true})
});

const io  = new Server(httpServer, {
    cors: ["http://localhost:5173", "https://university-student-psychiatrist-web.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"]
});




io.use((socket, next)=>{
    // contains the raw cookie string sent by the client during the WebSocket handshake
    const cookieHeader = socket.handshake.headers.cookie || '';
    console.log('in socket middlware');
    if (!cookieHeader)
    {
        return next(); // on initialization
    }
    // console.log('cookieHeader');
    // console.log(cookieHeader)
    const authToken =cookieHeader.split("=")[1]

    // console.log('authToken');
    // console.log(authToken);
    
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decoded)
    {
        return next(new Error("Authentication error"));
    }
    // console.log('decodedToken in socket middleware');
    // console.log(decoded);
    /*decodedToken in socket middleware
    {
    userId: '6903a4963253494881272acb',
    role: 'student',
    iat: 1766240932,
    exp: 1766248132
    }
    */
    socket.userId = decoded.userId;
    socket.role = decoded.role;
    next();

})



// io.on('eventName:connection') // connectionis an inbuitl event
io.on("connection", (socket)=>{
    console.log('server is listening on port 5000: Socket connected');
    try
    {
        socket.on("sendMessage", async (dataReceived, callback)=>
        {
            console.log('=== SERVER: sendMessage event ===');
            console.log('Socket ID:', socket.id);
            console.log(`hello this is message from user `);
            console.log(dataReceived);

            console.log(`socket userId: ${socket.userId}\nsocket role: ${socket.role} ${typeof(socket.role)}`); 
            const userId = socket.userId;
            const role = socket.role;

            await sendMessage(data=dataReceived, socket, callback);
            if (typeof(callback) === "function")
            {
                // Save message to database
                console.log('Calling callback...');
                callback({
                    status: "ok", 
                    msg: "Message received at server"
                });
                // console.log('Callback called successfully');
                // saveMessageToDB(dataReceived);
            }
            else 
            {
                console.log('WARNING: No callback provided by client!');
                // we create new emit event for the user
                
            }
        });

        let someData =""
        // Support Team
        socket.emit("supportTeam", someData, (response)=>{

        })
    }
    catch(err)
    {
        console.log(`Socket Error: ${err}`);
    }
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