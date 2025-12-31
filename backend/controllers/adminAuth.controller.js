// create admin
// login admin
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




const genSalt = 15;
const createAdmin = async (req, res) => {
    // Implementation for creating an admin
    const { email, password, role, permissions, phoneNumber, department } = req.body;
    if (!email || !password || !role || !department) {
        return res.status(400).json({ success:false,  message: 'Missing required fields' });
    }
    try
    {

        const hashPassword = await bcrypt.hash(password, genSalt);
        const newAdmin = await Admin.create({email:email, password:hashPassword, role:role, permissions:permissions, phoneNumber:phoneNumber, department:department});
        if (!newAdmin) {
            return res.status(500).json({ success:false, message: 'Failed to create admin' });
        }
        res.status(201).json({ success:true, message: 'Admin created successfully', admin: newAdmin });
        // later CHANGE THE admin to remove admin
    }
    catch(err)
    {
        console.log(`Error creating admin: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const loginAdmin = async (req, res) => {
    // Implementation for admin login
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success:false, message: 'Missing email or password' });
    }
    try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ success:false, message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success:false, message: 'Invalid password' });
        }
        const adminToken = jwt.sign({id:admin._id, role:admin.role}, process.env.ADMIN_JWT_SECRET, {expiresIn: '240m'})
        if (!adminToken)
        {
            return res.status(500).json({success:true, msg:"Failed authentication"});
        }
        res.cookie("adminToken", adminToken, {
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: '2 * 60 * 60 * 1000' // 2 hours
        })
        res.status(200).json({ success:true, message: 'Login successful' });
    } catch (err) {
        console.log(`Error logging in admin: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// password reset
const resetPassword = async (req, res) => {
    // Implementation for password reset
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ success:false, message: 'Missing email or new password' });
    }
    try
    {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ success:false, message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success:false, message: 'Current password is incorrect' });
        }
        const hashNewPassword =  await bcrypt.hash(newPassword, genSalt);
        admin.password = hashNewPassword;
        await admin.save();
        res.status(200).json({ success:true, message: 'Password reset successful' });
    }
    catch(err)
    {
        console.log(`Error resetting password: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
