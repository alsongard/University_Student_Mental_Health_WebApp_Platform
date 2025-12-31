const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        email :
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password : {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin'],
            default: 'admin',
            required: true,
        },
        permissions: {
            type: [String],
            default: [],
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        department: {
            type: String,
            required: true,
            defautl: 'General',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default:""
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        twoFactorEnabled: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;