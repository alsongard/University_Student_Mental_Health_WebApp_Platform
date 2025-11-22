// register student and pyschatriast
// admin functionalities
const Student = require("../models/student.model");
const crypto = require("crypto");
const transporter = require("../config/nodemailerTransporter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const genSalt = 10;
const registerStudent = async (req, res)=>{
    const {studentAdmissionNum, email, password} = req.body;
    
    if (!studentAdmissionNum || !email || !password )
    {
        return res.status(400).json({success:false, msg:"Invalid input"})
    }

    try
    {
        const hashPassword = await bcrypt.hash(password, genSalt);
        const new_student = await Student.create({studentAdmissionNum:studentAdmissionNum, email:email, password:hashPassword})

        if (!new_student)
        {
            return res.status(500).json({success:false, msg:"Internal Server Error!"})
        }


        const otp = crypto.randomBytes(64).toString('hex').slice(0,11);
        new_student.verifyOtp = otp;

        const otpExpireTimer = Date.now() + (15 * 60 * 1000); // milliseconds minutes * seconds * milliseconds
        new_student.verifyOtpExpiresIn = otpExpireTimer;


        await new_student.save();
        const mailOptions = {
            from: process.env.GMAIL_SERVICE_APP_USER,
            to: email,
            subject:"Account Verification",
            html:`<h2>Account Verification</h2>
                <p>Enter the following OTP for your account verification:</p>
                <b>${otp}</b>
                <p>These otp expires in 15 minutes</p>`
                ,
        }

        const info = await transporter.sendMail(mailOptions);


        infoStatus = info.response.split(" ")[2];
        // generate tempToken using jwt
        if (infoStatus == 'OK')
        {
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
        else
        {
            console.log(`error on sending mail`);
            return res.status(500).json({success:false, msg:`Error on sending mail`})
        }

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
// AAA-00-0000/0004  JASON@123
const studentLogin = async (req, res)=>{
    const {studentAdmission, password } = req.body;
    console.log("entering student login");

    try
    {

        if( !studentAdmission || !password)
        {
            return res.status(400).json({success:false, msg:"Invalid input parameters"});
        }

        const foundStudent = await Student.findOne({studentAdmissionNum: studentAdmission});

        if (!foundStudent)
        {
            return res.status(404).json({success:false, msg:`No student with the admission: ${studentAdmission}`});
        }
        const decodePass = await bcrypt.compare(password, foundStudent.password);

        if (!decodePass)
        {
            return res.status(400).json({success:false, msg:'Invalid credentials'});
        }
        if (!foundStudent.isAccountVerified)
        {
            return res.status(400).json({success:false, msg:'Accont not verified'});
        }

        if (decodePass && foundStudent.isAccountVerified === true)
        {
            const token = jwt.sign({userId: foundStudent._id}, process.env.JWT_SECRET, {expiresIn: "120m"});
            console.log("token");
            console.log(token);
            
            res.cookie("theToken", token, {
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: "strict", 
                maxAge: 120 * 60 *1000 //15 minutes
            });
            return res.status(200).json({success:true, msg:"Login Success"})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});   
    }

}
const passwordReset = async (req, res)=>{
    try
    {
        // get studentId
        const theToken  = req.cookie("theToken");
        const result = jwt.verify(theToken, process.env.JWT_SECRET);
        if (!result)
        {
            return res.status(400).json({success:false, help:'Verification Failed', msg:"Invalid credentials, relogin again"});
        }
        const studentId = result.userId

        const foundStudent = await Student.findById({_id:studentId})
        if (!foundStudent)
        {
            return res.status(500).json({success:false, msg:`No user found with the id: ${id}`});
        }
        if (!foundStudent.isAccountVerified)
        {
            return res.status(400).json({success:false, msg:'Accont not verified'});
        }

        if (foundStudent)
        {

            const otp = crypto.randomBytes(64).toString('hex').slice(0,11);
            foundStudent.resentOTP = otp;
    
            const otpExpireTimer = Date.now() + (15 * 60 * 1000); // milliseconds minutes * seconds * milliseconds
            foundStudent.resetOtpExpiresIn = otpExpireTimer;
            await foundStudent.save();
        }


        const mailOptions = {
            from : process.env.GMAIL_SERVICE_APP_USER,
            to : email,
            subject: "Password REset OTP", 
            body: `Your password reset otp is \n${otp}.\n The otp will expire in 15 minutes.`
        }

        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({success:true, msg:"Password reset otp sent!"});
    }
    catch(err)
    {
        return res.status(500).json({success:false, msg: `Error: ${err}`})
    }
}

const getPasswordResetOTP = async (req,res)=>{
    const resetOTP = req.body;
    try
    {
        if (!resetOTP)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const theToken = req.cookies("theToken");
        const userId = theToken.userId;
        const foundStudent = await Student.findOne({_id:userId});
        if (!foundStudent)
        {
            return res.status(400).json({success:false, msg:`No student with the id: ${userId}`});
        }
        if (!foundStudent.isAccountVerified)
        {
            return res.status(400).json({success:false, msg:`Account not verified`});
        }
    
        if (resetOTP != foundStudent.resentOTP)
        {
            return res.status(400).json({success:false, msg:`Reset OTP incorrect`});
        }
    
    
        if (resetOTP === foundStudent.resentOTP)
        {
            return res.status(200).json({success:true, msg:"Proceed to reset your password"});
        }
    }
    catch(err)
    {
        return res.status(500).json({success:false, msg: `Error: ${err}`})
    }
}
module.exports = {registerStudent, getOTPUser, studentLogin};


/**
 * So instead of sending the userId in the frontend we use a jwt token: tempToken
 * we then retrieve the temp token
 * verify
 * verifyAccount 

*/
