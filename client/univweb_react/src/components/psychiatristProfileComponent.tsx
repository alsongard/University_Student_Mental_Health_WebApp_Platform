import React, { useState } from 'react';
import { User, Mail, Lock, Camera, Edit, Save, X, Shield, CheckCircle, Eye, EyeOff, Bell, Phone, MapPin, Award } from 'lucide-react';

export default function PsychiatristProfile() 
{
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Psychiatrist data from database
    const [psychiatristData, setPsychiatristData] = useState({
        psychiatristId: "507f1f77bcf86cd799439012",
        psychiatristName: "Dr. Sarah Mwangi",
        psychiatristEmail: "sarah.mwangi@zetech.ac.ke",
        psychiatristPassword: "********",
        psychiatristImageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
        // Additional optional fields
        specialization: "Anxiety & Depression",
        licenseNumber: "MPD12345",
        yearsOfExperience: 12,
        phoneNumber: "+254 712 345 678",
        officeLocation: "Block B, Room 201, Zetech University",
        education: "MD, MRCPsych - University of Nairobi",
        bio: "Specialized in student mental health with over 12 years of experience helping young adults navigate academic stress, anxiety, and depression.",
        consultationHours: "Monday - Friday: 8:00 AM - 5:00 PM",
        languages: "English, Swahili"
    });

    const [editedData, setEditedData] = useState({ ...psychiatristData });
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
        newBookingAlerts: true,
        feedbackNotifications: true
    });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedData({ ...psychiatristData });
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
        setPsychiatristData({ ...editedData });
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
        console.log('Password update:', passwordData);
        alert('Password updated successfully!');
        setShowPasswordModal(false);
        setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // if (file) {
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setEditedData(prev => ({
        //     ...prev,
        //     psychiatristImageUrl: reader.result
        //     }));
        // };
        // reader.readAsDataURL(file);
        // }
    };

    const handleNotificationSave = () => {
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
                <div className="relative">
                    <img
                    src={isEditing ? editedData.psychiatristImageUrl : psychiatristData.psychiatristImageUrl}
                    alt={psychiatristData.psychiatristName}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition border-2 border-white">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        />
                    </label>
                    )}
                </div>
                <div className="ml-6 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{psychiatristData.psychiatristName}</h1>
                    <p className="text-gray-600">{psychiatristData.specialization}</p>
                    <p className="text-sm text-gray-500 mt-1">{psychiatristData.yearsOfExperience} years of experience</p>
                </div>
                </div>

                {/* Quick Info */}
                <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                    <Mail className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 text-sm truncate">{psychiatristData.psychiatristEmail}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                    <Phone className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900 text-sm">{psychiatristData.phoneNumber}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                    <Award className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-600">License Number</p>
                    <p className="font-semibold text-gray-900 text-sm">{psychiatristData.licenseNumber}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                    <MapPin className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-600">Office Location</p>
                    <p className="font-semibold text-gray-900 text-sm truncate">{psychiatristData.officeLocation}</p>
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
                    onClick={() => setActiveTab('professional')}
                    className={`py-4 font-semibold border-b-2 transition ${
                    activeTab === 'professional'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Professional Details
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
                        name="psychiatristName"
                        value={isEditing ? editedData.psychiatristName : psychiatristData.psychiatristName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                        </label>
                        <input
                        type="email"
                        name="psychiatristEmail"
                        value={isEditing ? editedData.psychiatristEmail : psychiatristData.psychiatristEmail}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        name="phoneNumber"
                        value={isEditing ? editedData.phoneNumber : psychiatristData.phoneNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Office Location
                        </label>
                        <input
                        type="text"
                        name="officeLocation"
                        value={isEditing ? editedData.officeLocation : psychiatristData.officeLocation}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Biography
                        </label>
                        <textarea
                        name="bio"
                        value={isEditing ? editedData.bio : psychiatristData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    </div>
                </div>
                )}

                {/* Professional Details Tab */}
                {activeTab === 'professional' && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Details</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Specialization
                        </label>
                        <input
                        type="text"
                        name="specialization"
                        value={isEditing ? editedData.specialization : psychiatristData.specialization}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        License Number
                        </label>
                        <input
                        type="text"
                        name="licenseNumber"
                        value={isEditing ? editedData.licenseNumber : psychiatristData.licenseNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Years of Experience
                        </label>
                        <input
                        type="number"
                        name="yearsOfExperience"
                        value={isEditing ? editedData.yearsOfExperience : psychiatristData.yearsOfExperience}
                        onChange={handleChange}
                        disabled={!isEditing}
                        min={0}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Languages
                        </label>
                        <input
                        type="text"
                        name="languages"
                        value={isEditing ? editedData.languages : psychiatristData.languages}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Education
                        </label>
                        <input
                        type="text"
                        name="education"
                        value={isEditing ? editedData.education : psychiatristData.education}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Consultation Hours
                        </label>
                        <input
                        type="text"
                        name="consultationHours"
                        value={isEditing ? editedData.consultationHours : psychiatristData.consultationHours}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    </div>

                    {isEditing && (
                    <div className="mt-6 flex space-x-2">
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
                            <p className="text-xs text-gray-500 mt-1">Last changed: 3 weeks ago</p>
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
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Account Security</h3>
                            <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold">Your account is secure</span>
                            </div>
                            <p className="text-sm text-gray-600">
                            Your account has strong password protection and secure access controls.
                            </p>
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
                            <p className="font-semibold text-gray-900">New Booking Alerts</p>
                            <p className="text-sm text-gray-600">Notifications when students book sessions</p>
                        </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="newBookingAlerts"
                            checked={notifications.newBookingAlerts}
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
                            <p className="font-semibold text-gray-900">Feedback Notifications</p>
                            <p className="text-sm text-gray-600">Alerts when students submit feedback</p>
                        </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="feedbackNotifications"
                            checked={notifications.feedbackNotifications}
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
            </div>
            </div>
        </div>

      {/* Password Change Modal
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2
        */}
    </div>
    )
}