import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Edit, Save, X, Shield, CheckCircle, Eye, EyeOff, Bell, Phone, MapPin, Award } from 'lucide-react';
import axios from 'axios';
export default function PsychiatristProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // THE FOUR STATES WILL BE USED TO MANAGE THE PSYCHIATRIST INFO
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        officeLocation: "",
        biography: ""
    });

    const [professionalDetails, setProfessionalDetails] = useState({
        specialization: "",
        education: "",
        language: "",
        licenseNumber: "",
        yearsOfExperience: "",
        consultationDays: [],
        consulationHours: ""

    });
    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [notificationPreferences, setNotificationPreferences] = useState({
        emailNotification: "",
        smsNotification: "",
        appointMentReminders: "",
        newBookingAlerts: "",
        newFeedBackNotification: ""
    });


    const [psychiatristData, setPsychiatristData] = useState({
        psychiatristId: "",
        psychiatristName: "",
        psychiatristEmail: "",
        image: "",
        psychiatristPassword: "********",
        psychiatristImageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
        // Additional optional fields
        specialization: "",
        licenseNumber: "",
        yearsOfExperience: "",
        phoneNumber: "",
        officeLocation: "",
        education: "",
        bio: "",
        consultationDays: [],
        consultationHours: "",
        languages: "English"
    });
    const email = localStorage.getItem('email')
    /*
    */
    // getPsychiatristProfileData

    const getPsychiatristProfile = async () => {
        try {
            // https://university-student-psychiatrist.onrender.com/
            // const response = await axios.get(`http://localhost:5000/api/psychiatristDetails/getPsychiatristDetails`, {withCredentials:true});
            const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/getPsychiatristDetails`, { withCredentials: true });
            if (response.data.success) {
                // console.log('repsonse.data.data');
                const retrievedData = response.data.data;
                setPersonalInfo({
                    fullName: retrievedData.fullName,
                    email: retrievedData.psychiatristEmail || "Stephen West",
                    phoneNumber: retrievedData.phoneNumber,
                    officeLocation: retrievedData.officeLocation,
                    biography: retrievedData.biography
                });
                setProfessionalDetails({
                    specialization: retrievedData.specilization,
                    education: retrievedData.Education,
                    language: "English",
                    licenseNumber: "1LDA2123",
                    yearsOfExperience: retrievedData.yearsExperience,
                    consultationDays: retrievedData.consultationDays,
                    consulationHours: retrievedData.consultationHours
                });
                setNotifications({
                    emailNotifications: true,
                    smsNotifications: false,
                    appointmentReminders: true,
                    newBookingAlerts: true,
                    feedbackNotifications: true
                })
                setPsychiatristData({
                    psychiatristId: "",
                    psychiatristName: retrievedData.fullName,
                    image: retrievedData.image,
                    psychiatristEmail: email || "Stephen West",
                    psychiatristPassword: "******",
                    psychiatristImageUrl: " https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
                    specialization: retrievedData.specilization,
                    licenseNumber: "1LDA2123",
                    yearsOfExperience: retrievedData.yearsExperience,
                    phoneNumber: retrievedData.phoneNumber,
                    officeLocation: retrievedData.officeLocation,
                    education: retrievedData.Education,
                    bio: retrievedData.biography,
                    consultationDays: retrievedData.consultationDays,
                    consultationHours: retrievedData.consultationHours,
                    languages: "english"
                });
            }
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }
    useEffect(() => {
        getPsychiatristProfile();
    }, []);

    const accessTabs:Array<string> = ['personal', 'professional', 'security', 'notifications'];
    // Psychiatrist data from database


    const [editedData, setEditedData] = useState({ ...psychiatristData });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [viewPassword, setViewPassword] = useState("password");
    const handleViewPassword = () => {
        if (viewPassword == 'password') {
            setViewPassword('text')
        }
        else {
            setViewPassword('password')
        }
    }

    // Notification preferences
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        newBookingAlerts: true,
        feedbackNotifications: true
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // handle Change PersonalInfo
    const handlePersonalInfoChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    };


    // handle Change ProfessionalDetails
    const handleProfessionalDetails = (event) => {
        const { name, value } = event.target;
        setProfessionalDetails((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    };


    // handle Change Notifications
    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    // handle Password Change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const [successChangePassword, setSuccessChangePassword] = useState(false);
    const [errorChangePassword, setErrorChangePassword] = useState(false);

    // handle Password Submit
    const handlePasswordUpdate = async (event) => {
        event.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }

        try {
            // /api/psychatriast/updatePsychiatristPassword
            // const response = await axios.put("http://localhost:5000/api/psychatriast/updatePsychiatristPassword", {
            const response = await axios.put("https://university-student-psychiatrist.onrender.com/api/psychatriast/updatePsychiatristPassword", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            },
                { withCredentials: true });
            if (response.data.success) {
                setSuccessChangePassword(true);
                setTimeout(() => {
                    setSuccessChangePassword(false);
                    setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    setShowPasswordModal(false);

                }, 6000)
            }
        }
        catch (err) {
            console.log(`Error: ${err}`);
            setErrorChangePassword(true);
            setTimeout(() => {
                setErrorChangePassword(false);
            }, 4000)
        }


    };


    // HANDLE FILE UPLOAD
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleImageUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('files', selectedFile);
        console.log("formData");
        console.log(formData)
        try 
        {
            // https://university-student-psychiatrist.onrender.com
            // const response = await axios.post("http://localhost:5000/api/uploadFile", formData, {
            const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/uploadFile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
                withCredentials: true
            })
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // SAVING DATA
    const handlePersonalSubmit = async (event) => {
        try {
            await handleImageUpload(event);
            // https://university-student-psychiatrist.onrender.com/
            // const response = await axios.put(`http://localhost:5000/api/psychiatristDetails/updatePsychiatristDetails`, {
            const response = await axios.put(`https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/updatePsychiatristDetails`, {
                fullName: personalInfo.fullName,
                phoneNumber: personalInfo.phoneNumber,
                officeLocation: personalInfo.officeLocation,
                biography: personalInfo.biography
            }, { withCredentials: true });
            if (response.data.sucess) {
                alert('Profile updated successfully!');
            }
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    // SAVING DATA PROFESSIONAL DETAILS
    const [professionSuccessMessage, setProfessionSuccessMessage] = useState(false);
    const handleProfessionalSubmit = async (event) => {
        try {

            // const response = await axios.put(`http://localhost:5000/api/psychiatristDetails/updatePsychiatristDetails/692bbcb9946ace680fc7e177`, {
            const response = await axios.put(`https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/updatePsychiatristDetails`, {
                specilization: professionalDetails.specialization,
                yearsExperience: professionalDetails.yearsOfExperience,
                consultationDays: professionalDetails.consultationDays,
                consultationHours: professionalDetails.consulationHours,
                Education: professionalDetails.education
            }, { withCredentials: true });;
            if (response.data.success) {

                setProfessionSuccessMessage(true);
                setTimeout(() => {
                    setProfessionSuccessMessage(false);
                }, 6000)
                // alert("Professional Details Updated Successfully");
            }

        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    };


    const [notificationsSuccessMessage, setNotificationsSuccessMessage] = useState(false);
    const handleNotificationSave = async (event) => {
        try {
            // https://university-student-psychiatrist.onrender.com/
            // const response = await axios.put(`http://localhost:5000/api/psychiatristDetails/updatePsychiatristDetails`, {
            const response = await axios.put(`https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/updatePsychiatristDetails`, {
                email: notifications.emailNotifications,
                sms: notifications.emailNotifications,
                alerts: notifications.emailNotifications,
                feedbackNotif: notifications.emailNotifications,
            }, { withCredentials: true });
            if (response.data.success) {

                setNotificationsSuccessMessage(true);
                setTimeout(() => {
                    setNotificationsSuccessMessage(false);
                }, 6000)
                // alert("Professional Details Updated Successfully");
            }

        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
        // alert('Notification preferences updated!');
    };

    return (
        <div className="min-h-screen dark:bg-slate-800 bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900  rounded-2xl shadow-lg overflow-hidden mb-6">

                    <div className="bg-gradient-to-r dark:from-slate-900 from-blue-600 dark:to-slate-900  to-blue-700 h-32"></div>
                    <div className="px-8  pb-8">
                        <div className="flex items-end -mt-16 mb-6">
                            <div className="relative">
                                <img
                                    src={psychiatristData.image ? psychiatristData.image : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop"}
                                    alt={psychiatristData ? psychiatristData.psychiatristName : "Loading.."}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                />
                                {
                                    isEditing && (
                                        <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition border-2 border-white">
                                            <Camera className="w-5 h-5 text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"

                                            />
                                        </label>
                                    )}
                            </div>
                            <div className="ml-6 mb-2">
                                <h1 className="text-3xl font-bold dark:text-white text-gray-900">{psychiatristData.psychiatristName}</h1>
                                <p className="text-gray-600 dark:text-white">{psychiatristData.specialization}</p>
                                <p className="text-sm text-gray-500 dark:text-white mt-1">{psychiatristData.yearsOfExperience} years of experience</p>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid md:grid-cols-4  gap-4">
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
                <div className=" bg-gradient-to-r  dark:from-slate-900  dark:to-slate-900 from-bg-white to-bg-white  dark:border-1 dark:border-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 px-8">
                            {
                                accessTabs.map((accessItem, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(accessItem)}
                                            className={`py-4 font-semibold border-b-2 transition ${accessItem === activeTab
                                                    ? 'border-blue-600 dark:text-white text-blue-600'
                                                    : 'border-transparent text-gray-600 dark hover:text-gray-900'
                                                }`}
                                        >
                                            {accessItem}
                                        </button>
                                    )
                                })
                            }

                        </div>
                    </div>

                    <div className="p-8 dark:bg-slate-900">
                        {/* Personal Information Tab */}
                        {activeTab === 'personal' && (
                            <div className="">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold dark:text-white text-gray-900">Personal Information</h2>
                                    {/* BUTTON FOR UPDATING PERSONAL INFO ONLY */}
                                    {!isEditing ? (
                                        <button
                                            onClick={handleEditToggle} // handleEditToggle function handles 2 things; one update isEditing state value:True/False and add data to the array editedData
                                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span className="dark:text-white">Edit Profile</span>
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
                                                onClick={handlePersonalSubmit}
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
                                        <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        {
                                            isEditing && (

                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={personalInfo.fullName}
                                                    onChange={handlePersonalInfoChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border dark:text-white dark:placeholder-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {personalInfo.fullName}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm  dark:text-white font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        {
                                            isEditing && (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={personalInfo.email}
                                                    onChange={handlePersonalInfoChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {personalInfo.email}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {
                                            isEditing && (
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={personalInfo.phoneNumber}
                                                    onChange={handlePersonalInfoChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 border dark:text-white dark:placeholder-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full px-4 py-3 border dark:text-white  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {personalInfo.phoneNumber}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Office Location
                                        </label>
                                        {
                                            isEditing && (
                                                <input
                                                    type="text"
                                                    name="officeLocation"
                                                    value={personalInfo.officeLocation}
                                                    onChange={handlePersonalInfoChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {personalInfo.officeLocation}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm  dark:text-white font-semibold text-gray-700 mb-2">
                                            Biography
                                        </label>
                                        {
                                            isEditing && (

                                                <textarea
                                                    name="biography"
                                                    value={personalInfo.biography}
                                                    onChange={handlePersonalInfoChange}
                                                    disabled={!isEditing}
                                                    rows={4}
                                                    className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed whitespace-pre-wrap">
                                                    {personalInfo.biography}
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Professional Details Tab */}
                        {activeTab === 'professional' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Professional Details</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={handleEditToggle} // handleEditToggle function handles 2 things; one update isEditing state value:True/False and add data to the array editedData
                                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit Profession</span>
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
                                                onClick={handleProfessionalSubmit}
                                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Specialization
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name="specialization"
                                                    value={professionalDetails.specialization}
                                                    onChange={handleProfessionalDetails}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            ) : (
                                                <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {professionalDetails.specialization}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm  dark:text-white font-semibold text-gray-700 mb-2">
                                            License Number
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name="licenseNumber"
                                                    value={professionalDetails.licenseNumber}
                                                    onChange={handleProfessionalDetails}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 dark:text-white  dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            ) : (
                                                <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {professionalDetails.licenseNumber}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Years of Experience
                                        </label>
                                        {
                                            isEditing && (
                                                <input
                                                    type="number"
                                                    name="yearsOfExperience"
                                                    value={professionalDetails.yearsOfExperience}
                                                    onChange={handleProfessionalDetails}
                                                    disabled={!isEditing}
                                                    min={0}
                                                    className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                        }
                                        {
                                            !isEditing && (
                                                <p className="w-full dark:text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                    {professionalDetails.yearsOfExperience} years
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Languages
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name="language"
                                                    value={professionalDetails.language}
                                                    onChange={handleProfessionalDetails}
                                                    disabled={!isEditing}
                                                    className="w-full dark:text-white  dark:placeholder-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            )
                                                :
                                                (
                                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                        {professionalDetails.language}
                                                    </p>
                                                )
                                        }
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Education
                                        </label>
                                        {
                                            isEditing ?
                                                (
                                                    <input
                                                        type="text"
                                                        name="education"
                                                        value={professionalDetails.education}
                                                        onChange={handleProfessionalDetails}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    />
                                                )
                                                :
                                                (
                                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                        {professionalDetails.education}
                                                    </p>
                                                )
                                        }
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Consultation Days
                                        </label>
                                        {
                                            isEditing ?
                                                (
                                                    <input
                                                        type="text"
                                                        name="consultationDays"
                                                        value={professionalDetails.consultationDays}
                                                        onChange={handleProfessionalDetails}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    />
                                                ) :
                                                (
                                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                        {psychiatristData.consultationDays.map((day) => day + ", ")}
                                                    </p>
                                                )
                                        }
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                            Consultation Hours
                                        </label>
                                        {
                                            isEditing ?
                                                (
                                                    <input
                                                        type="text"
                                                        name="consulationHours"
                                                        value={professionalDetails.consulationHours}
                                                        onChange={handleProfessionalDetails}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-3 dark:text-white dark:placeholder-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    />
                                                ) :
                                                (
                                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed">
                                                        {professionalDetails.consulationHours}
                                                    </p>
                                                )
                                        }
                                    </div>
                                    {
                                        professionSuccessMessage &&
                                        (
                                            <p className="bg-green-500 py-2.5 pl-1 rounded-md">Profile data  has been Successfully updated</p>

                                        )
                                    }

                                </div>


                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' &&
                            (
                                <div>
                                    <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Security Settings</h2>
                                    <div className="space-y-6 ">
                                        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Lock className="w-6 h-6  text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">Password</h3>
                                                        <p className="text-gray-600 text-sm dark:text-white ">Change your account password</p>
                                                        {/* <p className="text-xs text-gray-500 mt-1">Last changed: 3 weeks ago</p> */}
                                                    </div>
                                                </div>
                                                {
                                                    !showPasswordModal ? (

                                                        <button
                                                            onClick={() => { setShowPasswordModal(true) }}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                                        >
                                                            Change Password
                                                        </button>
                                                    ) : (
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => { setShowPasswordModal(false) }}
                                                                className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                                            >
                                                                <X className="w-4 h-4" />
                                                                <span>Cancel</span>
                                                            </button>
                                                            <button
                                                                onClick={handlePasswordUpdate}
                                                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                                            >
                                                                <Save className="w-4 h-4" />
                                                                <span>Update Password</span>
                                                            </button>
                                                        </div>
                                                    )

                                                }


                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Shield className="w-6 h-6  text-green-600" />
                                                </div>
                                                <div className="flex-1 ">
                                                    <h3 className="text-lg  dark:text-white font-bold text-gray-900 mb-1">
                                                        Account Security
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                        <span className="text-green-700 dark:text-white font-semibold">Your account is secure</span>
                                                    </div>
                                                    <p className="text-sm dark:text-white text-gray-600">
                                                        Your account has strong password protection and secure access controls.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* PASSWORD MODAL */}
                                        {
                                            showPasswordModal &&
                                            (
                                                <div className="space-y-4 ">
                                                    <div>
                                                        <p className='py-[10px] dark:text-white'>
                                                            To change password enter your current password and fill in the confirm and new password fields.<br /> Ensure they both match
                                                        </p>
                                                        <label className=" text-sm font-semibold dark:text-white text-gray-700 mb-2">
                                                            Current Password
                                                        </label>
                                                        <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                                            <input
                                                                name='currentPassword'
                                                                type={viewPassword}
                                                                className="w-full py-3 px-2.5 dark:text-white  focus:outline-0 rounded-lg"
                                                                value={passwordData.currentPassword}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <Eye className="mr-5 dark:text-white" onClick={handleViewPassword} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold dark:text-white mb-2">New Password</label>
                                                        <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                                            <input
                                                                name="newPassword"
                                                                type={viewPassword}
                                                                onChange={handlePasswordChange}
                                                                value={passwordData.newPassword}
                                                                className="w-full py-3 px-2.5 focus:outline-0"
                                                            />
                                                            <Eye className="mr-5 dark:text-white" onClick={handleViewPassword} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">Confirm New Password</label>
                                                        <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                                            <input
                                                                type={viewPassword}
                                                                name="confirmPassword"
                                                                value={passwordData.confirmPassword}
                                                                onChange={handlePasswordChange}
                                                                className="w-full py-3 px-2.5 dark:text-white focus:outline-0"
                                                            />
                                                            <Eye className="mr-5 dark:text-white" onClick={handleViewPassword} />
                                                        </div>
                                                    </div>
                                                    <button onClick={handlePasswordUpdate} className="px-6 py-3  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                                                        Update Password
                                                    </button>
                                                    {
                                                        successChangePassword && (
                                                            <p className="bg-green-500 py-2.5 pl-1 rounded-md">Password has been Successfully updated</p>
                                                        )
                                                    }
                                                    {
                                                        errorChangePassword && (
                                                            <p className="bg-red-500 py-2.5 pl-1 rounded-md">Error updating password. Please try again.</p>
                                                        )
                                                    }
                                                </div>

                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }



                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Notification Preferences</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center dark:bg-slate-800 justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-semibold dark:text-white text-gray-900">Email Notifications</p>
                                                <p className="text-sm dark:text-white text-gray-600">Receive updates via email</p>
                                            </div>
                                        </div>
                                        <label className="relative  dark:text-white inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="emailNotifications"
                                                checked={notifications.emailNotifications}
                                                onChange={handleNotificationChange}
                                                className="sr-only peer "
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 dark:bg-slate-800 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-semibold dark:text-white text-gray-900">SMS Notifications</p>
                                                <p className="text-sm dark:text-white text-gray-600">Receive text message updates</p>
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
                                            <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 dark:bg-slate-800 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Bell className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-semibold dark:text-white text-gray-900">Appointment Reminders</p>
                                                <p className="text-sm dark:text-white text-gray-600">Get reminded before sessions</p>
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

                                    <div className="flex items-center dark:bg-slate-800 justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Bell className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-semibold dark:text-white text-gray-900">New Booking Alerts</p>
                                                <p className="text-sm dark:text-white text-gray-600">Notifications when students book sessions</p>
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

                                    <div className="flex items-center dark:bg-slate-800 justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-semibold dark:text-white text-gray-900">Feedback Notifications</p>
                                                <p className="text-sm dark:text-white text-gray-600">Alerts when students submit feedback</p>
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

                                    {
                                        notificationsSuccessMessage && (
                                            <p className="bg-green-500 py-2.5 pl-1 rounded-md mt-4">Notification preferences have been Successfully updated</p>
                                        )
                                    }
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