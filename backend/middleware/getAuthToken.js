const getAuthToken = (req)=>{
    const authToken = req.cookies.authToken;
    if (!authToken)
    {
        return res.status(400).json({success:false, msg:"No token found"});
    }
    return authToken;
}

module.exports = getAuthToken;