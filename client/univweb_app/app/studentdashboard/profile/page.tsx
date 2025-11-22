'use client';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CheckCircle, XCircle, Mail, Calendar, User, CreditCard, Edit, X, Save, Lock, Shield, Bell, Phone } from 'lucide-react';
export default function StudentProfile()
{
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Student data from database
    const [studentData, setStudentData] = useState({
        studentId: "",
        studentName: "",
        email: "",
        studentAdmissionNum: "",
        studentAge: 0,
        isAccountVerified: false,
        // Additional optional fields
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        course: "",
        yearOfStudy: 0,
        emergencyContactName: "",
        emergencyContactNumber: "",
        emergencyContactRelationship: "",

        address: "",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    });

    // Fetch student data from backend API if needed
    
    const fetchStudentDetails = async ()=>{
        try
        {
            const response = await axios.get('http://localhost:5000/api/studentDetails/getStudentDetails/690362a78d4fa3a14a78a9e3');
            if (response.data.success) {
                console.log(response.data);

                const {data} = response.data;
                console.log(`this is data emergency contact`);
                console.log(data.emergencyContact)
                console.log(data.emergencyContact.name);
                console.log(data.emergencyContact.phoneNumber);
                console.log(data.emergencyContact.relationship);
                setStudentData({
                    studentId: data.studentId._id,
                    studentName: data.studentName,
                    email: data.studentId.email,
                    studentAdmissionNum: data.studentId.studentAdmissionNum,
                    studentAge: data.studentAge,
                    isAccountVerified: data.studentId.isAccountVerified,
                    phoneNumber: data.phoneNumber || "",
                    dateOfBirth: data.dateOfBirth || "",
                    gender: data.gender || "",
                    course: data.course || "",
                    yearOfStudy: data.yearOfStudy || "",
                    emergencyContactName: data.emergencyContact.name,
                    emergencyContactNumber: data.emergencyContact.phoneNumber,
                    emergencyContactRelationship: data.emergencyContact.relationship,
                    address: data.address || "",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                });
            }
        }
        catch(err)
        {
            console.error('Error fetching student data:', err); 
        }
    }

    useEffect(() => {
        fetchStudentDetails()

    }, []);



    const [ editedData, setEditedData] = useState({ ...studentData });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Notification preferences
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        feedbackRequests: true,
        newsletterUpdates: false
    });

    const handleEditToggle = () => {
        if (isEditing) {
        setEditedData({ ...studentData });
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
        ...prev,
        [name]: checked
        }));
    };

    const handleSave = () => {
        // Here you would make API call to update student data
        setStudentData({ ...editedData });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New passwords do not match!');
        return;
        }
        if (passwordData.newPassword.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
        }
        // Here you would make API call to update password
        console.log('Password update:', passwordData);
        alert('Password updated successfully!');
        setShowPasswordModal(false);
        setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
        });
    };

    const handleNotificationSave = () => {
        // Here you would make API call to update notification preferences
        console.log('Notification preferences:', notifications);
        alert('Notification preferences updated!');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="flex items-end -mt-16 mb-6">
                    <img
                        src={studentData.avatar}
                        alt={studentData.studentName}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    <div className="ml-6 mb-2">
                        <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-900">{studentData.studentName}</h1>
                        {studentData.isAccountVerified ? (
                            <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">Verified</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1 px-3 py-1 bg-red-100 rounded-full">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-semibold text-red-700">Not Verified</span>
                            </div>
                        )}
                        </div>
                        <p className="text-gray-600">{studentData.studentAdmissionNum}</p>
                    </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <Mail className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900 text-sm truncate">{studentData.email}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-600">Age</p>
                        <p className="font-semibold text-gray-900">{studentData.studentAge} years</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <User className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-600">Course</p>
                        <p className="font-semibold text-gray-900 text-sm">{studentData.course}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <CreditCard className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-600">Year of Study</p>
                        <p className="font-semibold text-gray-900">{studentData.yearOfStudy}</p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-8">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`py-4 font-semibold border-b-2 transition ${
                        activeTab === 'personal'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Personal Information
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`py-4 font-semibold border-b-2 transition ${
                        activeTab === 'security'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`py-4 font-semibold border-b-2 transition ${
                        activeTab === 'notifications'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Notifications
                    </button>
                    </div>
                </div>

                <div className="p-8">
                    {/* Personal Information Tab */}
                    {activeTab === 'personal' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                        {!isEditing ? (
                            <button
                            onClick={handleEditToggle}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </button>
                            </div>
                        )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                        {/* Required Fields from Database */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                            </label>
                            <input
                            type="text"
                            name="studentName"
                            value={isEditing ? editedData.studentName : studentData.studentName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Admission Number *
                            </label>
                            <input
                            type="text"
                            name="studentAdmissionNum"
                            value={studentData.studentAdmissionNum}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Admission number cannot be changed</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                            </label>
                            <input
                            type="email"
                            name="email"
                            value={isEditing ? editedData.email : studentData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age *
                            </label>
                            <input
                            type="number"
                            name="studentAge"
                            value={isEditing ? editedData.studentAge : studentData.studentAge}
                            onChange={handleChange}
                            disabled={!isEditing}
                            min={16}
                            max={100}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Additional Fields */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                            </label>
                            <input
                            type="tel"
                            name="phoneNumber"
                            value={isEditing ? editedData.phoneNumber : studentData.phoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date of Birth
                            </label>
                            <input
                            type="date"
                            name="dateOfBirth"
                            value={isEditing ? editedData.dateOfBirth : studentData.dateOfBirth}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                            </label>
                            <select
                            name="gender"
                            value={isEditing ? editedData.gender : studentData.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Course
                            </label>
                            <input
                            type="text"
                            name="course"
                            value={isEditing ? editedData.course : studentData.course}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year of Study
                            </label>
                            <select
                            name="yearOfStudy"
                            value={isEditing ? editedData.yearOfStudy : studentData.yearOfStudy}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="5th Year">5th Year</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                            </label>
                            <input
                            type="text"
                            name="address"
                            value={isEditing ? editedData.address : studentData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 mt-4">Emergency Contact</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Emergency Contact Name
                            </label>
                            <input
                            type="text"
                            name="emergencyContactName"
                            value={isEditing ? editedData.emergencyContactName : studentData.emergencyContactName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Emergency Contact Number
                            </label>
                            <input
                            type="tel"
                            name="emergencyContactNumber"
                            value={isEditing ? editedData.emergencyContactNumber : studentData.emergencyContactNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        </div>
                    </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

                        <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Lock className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Password</h3>
                                <p className="text-gray-600 text-sm">Change your account password</p>
                                <p className="text-xs text-gray-500 mt-1">Last changed: 2 weeks ago</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Change Password
                            </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Account Verification</h3>
                                {studentData.isAccountVerified ? (
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-green-700 font-semibold">Your account is verified</span>
                                </div>
                                ) : (
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-red-700 font-semibold">Your account is not verified</span>
                                    </div>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                                    Verify Account
                                    </button>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

                        <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-600">Receive updates via email</p>
                            </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={notifications.emailNotifications}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-semibold text-gray-900">SMS Notifications</p>
                                <p className="text-sm text-gray-600">Receive text message updates</p>
                            </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="smsNotifications"
                                checked={notifications.smsNotifications}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Appointment Reminders</p>
                                <p className="text-sm text-gray-600">Get reminded before sessions</p>
                            </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="appointmentReminders"
                                checked={notifications.appointmentReminders}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Feedback Requests</p>
                                <p className="text-sm text-gray-600">Notifications to provide feedback</p>
                            </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="feedbackRequests"
                                checked={notifications.feedbackRequests}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Newsletter Updates</p>
                                <p className="text-sm text-gray-600">Mental health tips and resources</p>
                            </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="newsletterUpdates"
                                checked={notifications.newsletterUpdates}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        </div>

                        <div className="mt-6">
                        <button
                            onClick={handleNotificationSave}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Preferences
                        </button>
                        </div>
                    </div>
                    )}
                    {/* Password Change Modal */}
                    {showPasswordModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                            <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                            </div>

                            <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Current Password *
                                </label>
                                <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter current password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                New Password *
                                </label>
                                <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter new password"
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm New Password *
                                </label>
                                <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Confirm new password"
                                />
                            </div>
                            </div>

                            <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordUpdate}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Update Password
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}
