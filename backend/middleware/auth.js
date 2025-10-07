const jwt = require("jsonwebtoken");
const Authenticate = (req, res, next)=>{
    const token = req.cookie.tempToken;
    if (!token)
    {
        return res.status(400).json({success:false, msg:"Token not found"});
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!token)
    {
        return res.status(400).json({success:false, msg:"Invalid token"})
    }
    next();   
}

module.exports = Authenticate;
