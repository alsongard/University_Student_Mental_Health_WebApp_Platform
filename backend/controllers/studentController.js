const StudentDetails = require('../models/studentDetails.model');
const jwt = require("jsonwebtoken");
const createStudentDetails = async (req, res) => {
 ;
    
    try 
    {
        const { studentName, studentAge, gender, phoneNumber, course, yearOfStudy, address, emergencyContact, token } = req.body;
        if (!studentName || !studentAge || !gender || !phoneNumber || !course || !yearOfStudy || !address || !emergencyContact || !token) 
        {
            return res.status(400).json({success:false, msg:"Please fill in all fields"});
        }
        // const tempToken = req.cookies.theToken;
        // console.log('tempToken');
        // console.log(tempToken);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedToken)
        {
            return res.status(401).json({success:false, msg:"Invalid token"});
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
            studentId: verifiedToken.userId,
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
    try 
    {
        const {id} = req.params;

        const studentDetails = await StudentDetails.findOne({studentId: id}).populate({path: 'studentId', select: 'studentAdmissionNum email'});
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

module.exports = { createStudentDetails, getStudentDetails };