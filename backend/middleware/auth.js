const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");



const getAuthenticated =  async(req, res)=>
{
    const authToken = res.cookie["authToken"];

    if (!authToken)
    {
        return res.status(400).json({success:false, msg:"Failed Authentication"})
    }
    const decodedToken  = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decodedToken)
    {
        return res.status(400).json({success:false, msg:"This is an invalid token"})
    }
    
    const id = decodedToken.userId;
    // check if student exist
    const foundStudent = await Student.findById({_id:id});

    if(!foundStudent)
    {
        return res.status(400).json({success:false, msg:"Invalid token"})
    }
    // this means that the student has been found
    next(); // pass is decodedToken is safe

}

module.exports = {getAuthenticated};