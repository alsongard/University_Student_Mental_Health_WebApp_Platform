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

        // check if student already exists
        const already_exist = await Student.findOne({email: email, studentAdmissionNum: studentAdmissionNum});
        
        if (already_exist)
        {
            return res.status(409).json({success:false, msg:"Student already exists"});
        }
        const hashPassword = await bcrypt.hash(password, genSalt);
            
        const new_student = await Student.create({studentAdmissionNum:studentAdmissionNum, email:email, password:hashPassword})

        if (!new_student)
        {
            return res.status(500).json({success:false, msg:"Internal Server Error!"})
        }


        const otp = crypto.randomBytes(64).toString('hex').slice(0,11);
        new_student.verifyOtp = otp;

        const otpExpireTimer = Date.now() + (25 * 60 * 1000); // milliseconds minutes * seconds * milliseconds
        new_student.verifyOtpExpiresIn = otpExpireTimer;


        await new_student.save();
        const mailOptions = {
            from: process.env.GMAIL_SERVICE_APP_USER,
            to: email,
            subject:"Account Verification",
            html:`<h2>Account Verification</h2>
                <p>Enter the following OTP for your account verification:</p>
                <b>${otp}</b>
                <p>These otp expires in 25 minutes</p>`
        }

        const info = await transporter.sendMail(mailOptions);


        infoStatus = info.response.split(" ")[2];
        // generate tempToken using jwt
        console.log(`infostatus: ${infoStatus}`);
        if (infoStatus == 'OK')
        {
            const userObject = {userId: new_student._id};
            
            const tempTKN =  jwt.sign(userObject, process.env.JWT_SECRET, {expiresIn:'15m'});
            // console.log(`tempTKN:`);
            // console.log(tempTKN);
            // res.cookie('tempToken', tempTKN, {
            //     httpOnly:true,
            //     secure: process.env.NODE_ENV === 'production' ? true : false, 
            //     sameSite: "lax", 
            //     maxAge: 15 * 60 *1000, //15 minutes
            //     domain: "localhost",
            //     path: "/"
            // })
            return res.status(201).json({success:true, msg:'Student Created and Otp sent', data:{studentId: new_student._id, token: tempTKN}});
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
    const {userOtp, token, studentId} = req.body;
    console.log(`userOtp: ${userOtp}`);
    console.log(`token: ${token}`);
    console.log(`studentId: ${studentId}`);

    if (!userOtp || !token || !studentId)
    {
        return res.status(400).json({success:false, msg:"Invalid parameters"});
    }
    // const token = req.cookies['tempToken'];
    try
    {
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

        const foundStudent = await Student.findById({_id:id});
        console.log("foundStudent");
        console.log(foundStudent);
        if (!foundStudent)
        {
            return res.status(500).json({success:false, msg:`No user found with the id: ${id}`});
        }
        if (foundStudent.verifyOtp == userOtp )
        {
            foundStudent.isAccountVerified = true;
            foundStudent.verifyOtp = 0;
            foundStudent.verifyOtpExpiresIn = 0;
            const authToken = jwt.sign({userId: foundStudent._id}, process.env.JWT_SECRET, {expiresIn: "120m"});
            await foundStudent.save();
            
            return res.status(200).json({success:true, msg:"Account Verified"});
        }
        else
        {
            return res.status(400).json({success:false, msg:"Invalid OPT", data: {authToken: authToken}});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error: ${err}`});   
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
        // console.log("foundStudent");
        // console.log(foundStudent._id);
        if (!foundStudent)
        {
            return res.status(404).json({success:false, msg:`No student with the admission: ${studentAdmission}`});
        }
        if (!foundStudent.isAccountVerified)
        {
            return res.status(400).json({success:false, msg:'Accont not verified'});
        }
        const decodePass = await bcrypt.compare(password, foundStudent.password);

        if (!decodePass)
        {
            return res.status(400).json({success:false, msg:'Invalid credentials'});
        }

        if (decodePass && foundStudent.isAccountVerified === true)
        {
            const authToken =  jwt.sign({userId: foundStudent._id, role:"student"}, process.env.JWT_SECRET, {expiresIn: "120m"});
            // console.log("token");
            // console.log(authToken);
            
            res.cookie("authToken", authToken, {
                httpOnly:true,
                secure: process.env.NODE_ENV === "production", // set to true in production
                sameSite: "lax", // localhost frontend: port 5173 backend: port 5000
                maxAge: 6 * 60 * 60 * 1000 // 6 hours day
            });
            const studentInfo = {email: foundStudent.email, role:foundStudent.role};
            return res.status(200).json({success:true, data:{ studentInfo : studentInfo,  },  msg:"Login Success"})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`${err}`});   
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
        const theToken = req.cookies["tempToken"];
        const decodedToken = jwt.verify(theToken, process.env.JWT_SECRET);
        // console.log('this is decoded token');
        // console.log(decodedToken);
        const userId = decodedToken.userId;
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

const getMe =  (req, res)=>{ // using these to get the request object: header token
    const authToken = req.cookies.authToken;
    // console.log('theToken on getMe');
    // console.log(authToken);
    try
    {

        if (authToken)
        {
            const veriftyToken  = jwt.verify(authToken, process.env.JWT_SECRET);
            if (!veriftyToken)
            {
                return res.status(500).json({success:false, msg:"Failed authentication"})
            }
    
            return res.status(200).json({success:true,msg:"Success"});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Error ${err}`})
    }
}
const UpdatePassword = async (req, res)=>
{
    console.log('entering Update Password');
    const {id}= req.params;  // this will be acquired from token

    const { currentPassword, password} = req.body;
    if (!currentPassword || !password)
    {
        return res.status(400).json({success:false, msg:"Please fill in all fields"});
    }
    // Implementation for updating password
    try
    {
        const foundStudent = await Student.findById({_id:id});
        if (!foundStudent)
        {
            return res.status(500).json({success:false, msg:`No user found with the id: ${id}`});
        }

        // now to update password
        foundStudent.password =  password;

        foundStudent.save()
        return res.status(200).json({success:true, msg:"Password Updated Successfully"})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Server Error: ${err}`});
    }
}

const Logout  = (req,res)=>{
    res.clearCookie("authToken");
    return res.status(200).json({success:true})
}
module.exports = {registerStudent, getOTPUser, studentLogin, getMe, Logout, UpdatePassword};


/**
 * So instead of sending the userId in the frontend we use a jwt token: tempToken
 * we then retrieve the temp token
 * verify
 * verifyAccount 

*/
