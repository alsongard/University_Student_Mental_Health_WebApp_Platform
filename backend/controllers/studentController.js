const StudentDetails = require('../models/studentDetails.model');
const jwt = require("jsonwebtoken");
// const  { createUploadthing } = require("uploadthing/express");
// const PsychiatristDetails =  require('../models/psychiatristdetail.model');
const Student = require("../models/student.model")
const createStudentDetails = async (req, res) => {
    
    // const {id} = req.params;
    try 
    {
        // const id = decodedToken.userId;
        // req.userId = id;
        // req.role = decodedToken.role;
        
        const { studentName, studentAge, gender, phoneNumber, course, yearOfStudy, address, emergencyContact } = req.body;
        if (!studentName || !studentAge || !gender || !phoneNumber || !course || !yearOfStudy || !address || !emergencyContact) 
        {
            return res.status(400).json({success:false, msg:"Please fill in all fields"});
        }
        const id = req.userId;
        const role = req.role;

        if (role !== 'student')
        {
            return res.status(403).json({success:false, msg:"Unauthorized: Only students can create student details"});
        }
        // const tempToken = req.cookies.theToken;
        // console.log('tempToken');
        // console.log(tempToken);

        // CHECK IF ACCOUNT VERIFIED
        const foundStudent = await Student.findById({_id:id});
        if (foundStudent.isAccountVerified === false)
        {
            return res.status(403).json({success:false, msg:"Account not verified. Please verify your account before creating student details."});
        }

        
        // const {userObject} = tempToken;
        // tempToken
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTAzNjJhNzhkNGZhM2ExNGE3OGE5ZTMiLCJpYXQiOjE3NjI1MjcwNjEsImV4cCI6MTc2MjUzNDI2MX0.SAjGK9SWGYc9LzoAdUwnnZsQGUcrkxhiYaaojzLl-bA
        // verifiedToken
        // {
        //   userId: '690362a78d4fa3a14a78a9e3',
        //   iat: 1762527061,
        //   exp: 1762534261
        // }
        // const verifiedToken = jwt.verify(tempToken, process.env.JWT_SECRET);
        // console.log('verifiedToken');
        // console.log(verifiedToken);


        const new_studentDetails = await StudentDetails.create({
            studentId: id,
            studentName,
            studentAge,
            gender,
            phoneNumber,
            course,
            yearOfStudy,
            address,
            emergencyContact
        });

        if (!new_studentDetails)
        {
            return res.status(500).json({success:false, msg:"Error creating student details"});
        }

        return res.status(201).json({success:true, msg:"Student details created successfully", data:new_studentDetails});

    } 
    catch (err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }
}

const getStudentDetails = async (req, res)=>{
    // const {id} = req.params;
    try 
    {
        // const id = decodedToken.userId;
        // req.userId = id;
        // req.role = decodedToken.role;

        const id = req.userId;

        const role = req.role;


        
        const studentDetails = await StudentDetails.findOne({studentId: id}).populate({path: 'studentId', select: 'studentAdmissionNum email'});
        // console.log('this is studentDetails');
        // console.log(studentDetails);
        // console.log(typeof(studentDetails));
        if (!studentDetails) {
            return res.status(200).json({success:false, msg:"Student details not found"});
        }
        return res.status(200).json({success:true, data:studentDetails});
    } 
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, error:`${err}`});
    }
}



// const f = createUploadthing();

// const uploadRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//     profileImage: f({
//         image: {
//         /**
//          * For full list of options and defaults, see the File Route API reference
//          * @see https://docs.uploadthing.com/file-routes#route-config
//          */
//         maxFileSize: "4MB",
//         maxFileCount: 1,
//         },
//     })
//     .middleware(async({req})=>{ // the middlware function uses a different setup for accessing cookies
//         console.log("entering uploadthign middleware")
//         console.log("req.headers");
//         console.log(req.headers);
//         try
//         {
//             const cookieHeader = req.headers.cookie;
//             if (!cookieHeader)
//             {
//                 throw new Error("NO cookie header");
//             }
//             console.log("cookieHeader in uploadthing");
//             console.log(cookieHeader);
    
//             // Parse the cookie string to get the authToken
//             const myCookies = cookieHeader.split(';').reduce((acc, cookie) => {
//                 const [key, value] = cookie.trim().split('=');
//                 acc[key] = value;
//                 return acc;
//                 }, {});
//             console.log("myCookies");
//             console.log(myCookies);
//             const authToken = myCookies['authToken'];
//             if (!authToken) {
//                 throw new Error('No auth token');
//             }
//             const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
//             const { userId, role, email } = decodedToken;
//             return {id: userId, role:role, email: email}
//         }
//         catch(err)
//         {
//             console.log(`Uploadthing Error: ${err}`);
//         }

//     })
//     .onUploadComplete(async ({ metadata, file}) => {
//         console.log("Full file data:", file);
//         console.log(`studentId: ${metadata.id}`)

//         let foundUser = null;
//         try
//         {
//             console.log("running on onUploadComplete function");
//             if (metadata.role === 'student')
//             {
//                 foundUser = StudentDetails.findOne({studentId: metadata.id});
    
//             }
//             else if (metadata.role === 'psychiatrist')
//             {
//                 foundUser = PsychiatristDetails.findOne({psychiatristId: metadata.id});
//             }
//             if (!foundUser)
//             {
//                 throw new UploadThingError("Unauthorized user", "UNAUTHORIZED");
//             }
//             console.log(`file.url: ${file.url}`);
//             foundUser.image = file.url
//         }
//         catch(err)
//         {
//             throw new UploadThingError("Unauthorized user");
//         }
//     }),
// };












module.exports = { createStudentDetails, getStudentDetails };