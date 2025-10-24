// register student and pyschatriast
// admin functionalities
const Student = require("../models/student.model");
const crypto = require("crypto");
const transporter = require("../config/nodemailerTransporter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const genSalt = 10;
const registerStudent = async (req, res)=>{
    const {studentAdmissionNum, studentName, email, password, gender} = req.body;
    
    if (!studentAdmissionNum || !studentName || !email || !password || !gender)
    {
        return res.status(400).json({success:false, msg:"Invalid input"})
    }

    try
    {
        const hashPassword = await bcrypt.hash(password, genSalt);
        const new_student = await Student.create({studentAdmissionNum:studentAdmissionNum, studentName:studentName, email:email, password:hashPassword, gender:gender})

        if (!new_student)
        {
            return res.status(500).json({success:false, msg:"Internal Server Error!"})
        }
        console.log("new_student");
        console.log(new_student);

        const otp = crypto.randomBytes(64).toString('hex').slice(0,11);
        new_student.verifyOtp = otp;

        const otpExpireTimer = Date.now() + (15 * 60 * 1000);
        new_student.verifyOtpExpiresIn = otpExpireTimer;


        await new_student.save();
        const mailOptions = {
            from: "alsongadizo@gmail.com",
            to: email,
            subject:"Account Verification",
            html:`<h2>Account Verification</h2>
                <p>Enter the following OTP for your account verification:</p>
                <b>${otp}</b>
                <p>These otp expires in 15 minutes</p>`
                ,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log(`info`);
        console.log(info);

        // generate tempToken using jwt
        const userObject = {userId: new_student._id};
        const tempTKN =  jwt.sign(userObject, process.env.JWT_SECRET, {expiresIn:'15m'});
        
        res.cookie('tempToken', tempTKN, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "strict", 
            maxAge: 15 * 60 *1000 //15 minutes

        })
        return res.status(201).json({success:true, msg:'Student Created and Otp sent'});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }
    
}

// performing verification // button onclick=verifyAccount
const getOTPUser = async (req,res)=>{
    const {userOtp} = req.body;
    if (!userOtp)
    {
        return res.status(400).json({success:false, msg:"Invalid parameters"});
    }
    console.log(`userOtp: ${userOtp}`);
    const token = req.cookies.tempToken;

    console.log(`token`);
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifyToken");
    console.log(verifyToken);
    const id = verifyToken.userId;

    if (!id)
    {
        return res.status(500).json({success:false, msg:`NO id ${id}`})
    }

    const foundStudent = await Student.findOne({_id:id});

    if (!foundStudent)
    {
        return res.status(500).json({success:false, msg:`No user found with the id: ${id}`});
    }
    if (foundStudent.verifyOtp == userOtp )
    {
        foundStudent.isAccountVerified = true;
        foundStudent.verifyOtp = 0;
        foundStudent.verifyOtpExpiresIn = 0;
        await foundStudent.save();
        
        return res.status(200).json({success:true, msg:"Account Verified"});
    }
    else
    {
        return res.status(400).json({success:false, msg:"Invalid OPT"})
    }
}  

const studentLogin = async (req, res)=>{
    const {studentAdmission, password } = req.body;

    if(!studentAdmission || !password)
    {
        return res.status(400).json({success:false, msg:"Invalid input"});
    }

    const foundStudent = await Student.findOne({studentAdmissionNum: studentAdmission});

    if (!foundStudent)
    {
        return res.status(404).json({success:false, msg:`No student with the admission: ${studentAdmission}`})
    }
    const decodePass = await bcrypt.compare(password, foundStudent.password)
    
    if (foundStudent.password === decodePass && foundStudent.isAccountVerfified === true)
    {

        const token = jwt.sign({userId: foundStudent._id}, process.env.JWT_SECRET, {expiresIn: "120m"});
        res.cookie("theToken", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "strict", 
            maxAge: 120 * 60 *1000 //15 minutes
        });
        return res.status(200).json({success:true, msg:"Login Success"})
    }

    if (foundStudent.password != decodePass)
    {
        return res.status(400).json({success:false, msg:'Invalid credentials'});
    }
    if (!foundStudent.isAccountVerfified)
    {
        return res.status(400).json({success:false, msg:'Accont not verified'});
    }
}

module.exports = {registerStudent, getOTPUser, studentLogin};


/**
 * So instead of sending the userId in the frontend we use a jwt token: tempToken
 * we then retrieve the temp token
 * verify
 * verifyAccount 

*/
