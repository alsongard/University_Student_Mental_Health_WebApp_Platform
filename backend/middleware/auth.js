const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const Psychatriast = require("../models/physchatris.model");



const getAuthenticated =  async(req, res, next)=>
{
    console.log('entering getAuthenticated middleware');
    const authToken = req.cookies.authToken;
    // console.log('authToken from cookies: ');
    // console.log(authToken);

    if (!authToken)
    {
        return res.status(400).json({success:false, msg:"Failed Authentication"})
    }

    const decodedToken  = jwt.verify(authToken, process.env.JWT_SECRET);
    // console.log('decodedToken');
    // console.log(decodedToken);
    // decodedToken
    // {
        // userId: '6903a4963253494881272acb',
        // role: 'student',
        // iat: 1766052178,
        // exp: 1766059378
    // }

    /*
    decodedToken
        {
        userId: '692bbcb9946ace680fc7e177',
        role: 'psychiatrist',
        iat: 1766323690,
        exp: 1766338090
        }
    */
    if (!decodedToken)
    {
        return res.status(400).json({success:false, msg:"This is an invalid token"})
    }
    
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    req.email = decodedToken.email;
    // check if student exist
    const role = decodedToken.role;
    const id = decodedToken.userId;

    if (role === "student") // this only runs when user not exist
    {
        const foundStudent = await Student.findById({_id:id});
        if(!foundStudent)
        {
            return res.status(400).json({success:false, msg:"Invalid token"})
        }
    }
    if (role === "psychiatrist")
    {
        // TO DO: Add psychiatrist model check here
        const foundPsychiatrist  = await Psychatriast.findById({_id:id});
        if(!foundPsychiatrist) // this only runs when user not exist
        {
            return res.status(400).json({success:false, msg:"Invalid token"})
        }

    }
    // this means that the student has been found
    next(); // pass is decodedToken is safe

}

module.exports = {getAuthenticated};