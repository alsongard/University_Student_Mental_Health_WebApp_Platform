const PsychiatristDetails = require("../models/psychiatristdetail.model");
const Psychatriast = require("../models/physchatris.model");
const jwt = require("jsonwebtoken");
// create PsychiatristDetails
const createPsychiatristDetails = async (req, res)=>{
    // ill be using authToken
    const authToken = req.cookies.authToken;
    const { token , fullName, phoneNumber, officeLocation, biography, specilization, yearsExperience, Education, consultationDays, consultationHours,  email, sms, alerts, feedbackNotif } = req.body;
    console.log("psychiatrist details ");
    console.log(`token: ${token}\n fullName: ${fullName}\n phoneNumber: ${phoneNumber}\n officeLocation: ${officeLocation}\n biography: ${biography}\n specilization: ${specilization}\n yearsExperience: ${yearsExperience}\n Education: ${Education}\n consultationDays: ${consultationDays}\n consultationHours: ${consultationHours}\n email: ${email}\n sms: ${sms}\n alerts: ${alerts}\n feedbackNotif: ${feedbackNotif}`);
    if (!fullName || !phoneNumber || !officeLocation || !biography || !specilization || !yearsExperience || !Education || !consultationDays || !consultationHours || !email || !sms || !alerts || !feedbackNotif )
    {
        console.log("Missing fields in psychiatrist details creation");
        return res.status(400).json({success:false, message:"All fields are required"});
    }
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
        {
            return res.status(401).json({success:false, message:"Invalid token"});
        }
        const id = decoded.userId;
        const foundPsychiatrist = await Psychatriast.findById(id);
        if (!foundPsychiatrist)
        {
            return res.status(404).json({success:false, message:"Psychiatrist not found"});
        }

        const newPsychiatristDetails =  await PsychiatristDetails.create({
            psychiatristId: foundPsychiatrist._id,
            fullName,
            phoneNumber,
            officeLocation,
            biography,
            specilization,
            yearsExperience,
            Education,
            consultationDays,
            consultationHours,
            notifications: {
                email,
                sms,
                alerts,
                feedbackNotif
            }
        });
        
        return res.status(201).json({success:true, message:"Psychiatrist details created successfully", data:newPsychiatristDetails});
    }
    catch( err)
    {
        console.error(`Error : ${err}`);

        return res.status(500).json({success:false, message:`Error ${err}`});
    }


}

// get PsychiatristDetails
const getPsychiatristDetails = async (req, res)=>{
    // req.userId = decodedToken.userId;
    // req.role = decodedToken.role;
    const id = req.userId;
    const role = req.role;

    console.log(`Getting psychiatrist details for id: ${id} with role: ${role}`);

    if (role !== "psychiatrist" || !id)
    {
        return res.status(403).json({success:false, message:"Access denied: Only psychiatrists can access their details"});
    }
    try
    {
        const foundPsychiatrist = await Psychatriast.findById(id);
        if (!foundPsychiatrist)
        {
            return res.status(404).json({success:false, message:"Psychiatrist not found"});
        }

        const foundPsychiatristDetails = await PsychiatristDetails.findOne({psychiatristId: id});
        
        if (!foundPsychiatristDetails)
        {
            return res.status(404).json({success:false, message:"Psychiatrist Details not found"});
        }
        return res.status(200).json({success:true, data:foundPsychiatristDetails, msg:"details found"})

    }
    catch( err)
    {
        console.error(`Error : ${err}`);

        return res.status(500).json({success:false, message:`Error ${err}`});
    }    
}

// update PsychiatristDetails
const updatePsychiatristDetails = async (req, res)=>{
    const id = req.userId;
    if (!id)
    {
        return res.status(403).json({success:false, message:"Access denied: Invalid psychiatrist ID"});
    }
    const { fullName, phoneNumber, officeLocation, biography, specilization, yearsExperience, Education, consultationDays, consultationHours,  email, sms, alerts, feedbackNotif } = req.body;
    try
    {
        const foundPsychiatristDetails = await PsychiatristDetails.findOne({psychiatristId: id});
        if (!foundPsychiatristDetails)
        {
            return res.status(404).json({success:false, message:"Psychiatrist Details not found"});
        }

        if (!fullName && !phoneNumber && !officeLocation && !biography && !specilization && !yearsExperience && !Education && !consultationDays && !consultationHours && !email && !sms && !alerts && !feedbackNotif )
        {
            console.log("Missing fields in psychiatrist details update");
            return res.status(400).json({success:false, message:"At least one field is required to update"});
        }

        fullName && (foundPsychiatristDetails.fullName  = fullName);
        phoneNumber && (foundPsychiatristDetails.phoneNumber = phoneNumber);
        officeLocation && (foundPsychiatristDetails.officeLocation = officeLocation);
        biography && (foundPsychiatristDetails.biography = biography);
        specilization && (foundPsychiatristDetails.specilization = specilization);
        yearsExperience && (foundPsychiatristDetails.yearsExperience = yearsExperience);
        Education && (foundPsychiatristDetails.Education = Education);
        consultationDays && (foundPsychiatristDetails.consultationDays = consultationDays);
        consultationHours && (foundPsychiatristDetails.consultationHours = consultationHours);
        email && (foundPsychiatristDetails.notifications.email = email);
        sms && (foundPsychiatristDetails.notifications.sms = sms);
        alerts && (foundPsychiatristDetails.notifications.alerts = alerts);
        feedbackNotif && (foundPsychiatristDetails.notifications.feedbackNotif = feedbackNotif);
        
        await foundPsychiatristDetails.save();

        return res.status(200).json({success:true, message:"Psychiatrist Details updated successfully"});
    }
    catch(err)
    {
        console.error(`Error : ${err}`);
        return res.status(500).json({success:false, message:`Error ${err}`});
    }
}

// delete PsychiatristDetails

module.exports = {
    createPsychiatristDetails,
    getPsychiatristDetails,
    updatePsychiatristDetails
};