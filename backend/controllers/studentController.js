const StudentDetails = require('../models/studentDetails.model');
const jwt = require("jsonwebtoken");
const  { createUploadthing } = require("uploadthing/express");


const createStudentDetails = async (req, res) => {
    
    // const {id} = req.params;
    try 
    {
        // const id = decodedToken.userId;
        // req.userId = id;
        // req.role = decodedToken.role;
        
        const { studentName, studentAge, gender, phoneNumber, course, yearOfStudy, address, emergencyContact, token } = req.body;
        if (!studentName || !studentAge || !gender || !phoneNumber || !course || !yearOfStudy || !address || !emergencyContact || !token) 
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
            return res.status(404).json({success:false, msg:"Student details not found"});
        }
        return res.status(200).json({success:true, data:studentDetails});
    } 
    catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, error:`${err}`});
    }
}



const f = createUploadthing();

const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
    myFileRouter: f({
        image: {
        /**
         * For full list of options and defaults, see the File Route API reference
         * @see https://docs.uploadthing.com/file-routes#route-config
         */
        maxFileSize: "4MB",
        maxFileCount: 1,
        },
    })
    .middleware(async({input})=>{
        const studentId = input.studentId;
        console.log(`studentId: ${studentId}`);
        return {studentId}
    })
    .onUploadComplete(async ({ metadata, file}) => {
        console.log("Full file data:", file);
        console.log(`studentId: ${metadata.studentId}`)
    }),
} ;


module.exports = { createStudentDetails, getStudentDetails, uploadRouter };