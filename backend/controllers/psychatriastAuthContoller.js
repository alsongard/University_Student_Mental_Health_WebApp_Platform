// register psychiatrist
const Psychatriast = require("../models/physchatris.model");
const crypto = require("crypto");
const transporter = require("../config/nodemailerTransporter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const genSalt = 10;
const registerMedic = async (req, res)=>{
    const {psychiatristId, psychiatristName, psychiatristEmail, psychiatristPassword} = req.body;
    if (!psychiatristId || !psychiatristName || !psychiatristEmail || !psychiatristPassword)
    {
        return res.status(400).json({success:false, msg:"Invalid input"})
    }

    // before creating we check if psychiatrist exists
    const existPsychiatrist = await Psychatriast.findOne({psychiatristId:psychiatristId})
    if(existPsychiatrist)
    {
        return res.status(409).json({ success: false, msg: "Psychiatrist already exists" });
    }

    const hashPassword = await bcrypt.hash(psychiatristPassword, genSalt);
    const new_psychiatrist = await Psychatriast.create(
        {
            psychiatristId:psychiatristId,
            psychiatristName:psychiatristName,
            psychatriastEmail:psychiatristEmail,
            psychiatristPassword:hashPassword
        }
    )

    if (!new_psychiatrist)
    {
        return res.status(500).json({success:false, msg:"Internal Server Error!"})
    }

    const otp = crypto.randomBytes(64).toString('hex').slice(0,11);
    new_psychiatrist.verifyOtp = otp;

    const otpExpireTimer = Date.now() + (20 * 60 * 1000);
    new_psychiatrist.verifyOtpExpiresIn = otpExpireTimer;


    await new_psychiatrist.save();
    const mailOptions = {
        from: process.env.GMAIL_SERVICE_APP_USER,
        to: psychiatristEmail,
        subject: "Account Verification",
        html: `<p>Copy your <strong>${otp}</strong> to verfiy your account <br> This otp expires in 20 minutes</p> `
    }
    const info = await transporter.sendMail(mailOptions);
    console.log(`info`);
    console.log(info);

    // generate tempToken using jwt
    const userObject = {userId: new_psychiatrist._id};
    const tempTKN =  jwt.sign(userObject, process.env.JWT_SECRET, {expiresIn:'15m'});
    res.cookie('tempToken', tempTKN, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: "lax", 
        maxAge:  15 * 60 *1000 //15 minutes

    })
    return res.status(201).json({success:true, msg:'Psychiatrist Created and Otp sent'});
}

// performing verification // button onclick=verifyAccount
const getOTPUser = async (req,res)=>{
    const userOtp = req.body;
    console.log(req.cookies)
    if (!userOtp)
    {
        return res.status(400).json({success:false, msg:"Invalid parameters"});
    }
    const token = req.cookies["tempToken"]
    console.log('token from psychiatrist: GETOTP')
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifyToken");
    console.log(verifyToken);
    const id = verifyToken.userId;

    if (!id)
    {
        return res.status(500).json({success:false, msg:`NO id ${id}`})
    }

    const foundPsychiatrist = await Psychatriast.findOne({_id:id});
    console.log('foundPsychiatrist');
    console.log(foundPsychiatrist)
    if (!foundPsychiatrist)
    {
        return res.status(500).json({success:false, msg:`No psychiatrist found with the id: ${id}`});
    }
    if (userOtp == foundPsychiatrist.verifyOtp )
    {
        console.log(`the OTP Value is correct`)
        foundPsychiatrist.isAccountVerified = true;
        foundPsychiatrist.verifyOtp = 0;
        foundPsychiatrist.verifyOtpExpiresIn = 0;
        await foundPsychiatrist.save();
        
        // verifyOtp: '278e593eea0',
        return res.status(200).json({success:true, msg:"Account Verified"});
    }
    else
    {
        return res.status(400).json({success:false, msg:"Invalid OPT"})
    }
}  

const medicLogin = async (req, res)=>{
    const {psychiatristId, password } = req.body;

    if(!psychiatristId || !password)
    {
        return res.status(400).json({success:false, msg:"Invalid input"});
    }

    const foundPsychiatrist = await Psychatriast.findOne({psychiatristId: psychiatristId});

    if (!foundPsychiatrist)
    {
        return res.status(404).json({success:false, msg:`No psychiatrist with the id: ${psychiatristId}`})
    }
    const decodePass = await bcrypt.compare(password, foundPsychiatrist.password)

    if (foundPsychiatrist.password === decodePass && foundPsychiatrist.isAccountVerified === true)
    {

        const token = jwt.sign({userId: foundPsychiatrist._id}, process.env.JWT_SECRET, {expiresIn: "120m"});
        res.cookie("theToken", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "strict", 
            maxAge: 120 * 60 *1000 //15 minutes
        });
        return res.status(200).json({success:true, msg:"Login Success"})
    }

    if (foundPsychiatrist.password != decodePass)
    {
        return res.status(400).json({success:false, msg:'Invalid credentials'});
    }
    if (!foundPsychiatrist.isAccountVerified)
    {
        return res.status(400).json({success:false, msg:'Account not verified'});
    }
}

const getPsychiatristInfo = async (req,res)=>{

    const {id} = req.params;
    try
    {
        const foundPsychiatrist = await Psychatriast.findById({_id:id}).select("psychiatristId psychiatristName specilization psychatriastEmail")
        if (!foundPsychiatrist)
        {
            return res.status(400).json({success:false, msg:`No user with id: ${id}`})
        }

        return res.status(200).json({success:true, data:foundPsychiatrist})
    }
    catch(err)
    {

    }
}


/**
 * So instead of sending the userId in the frontend we use a jwt token: tempToken
 * we then retrieve the temp token
 * verify
 * verifyAccount , 

*/


module.exports = {medicLogin, getOTPUser, getPsychiatristInfo, registerMedic};