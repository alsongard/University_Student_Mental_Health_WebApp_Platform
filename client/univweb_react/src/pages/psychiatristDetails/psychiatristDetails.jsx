import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, Briefcase, GraduationCap, Calendar, Clock, Bell } from 'lucide-react';

export default function PsychiatristDetails() 
{
    const apiURL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        officeLocation: '',
        biography: '',
        specilization: '',
        yearsExperience: '',
        Education: '',
        consultationDays: [],
        consultationHours: '',
        notifications: {
            email: false,
            sms: false,
            alerts: false,
            feedbackNotif: false
        }
    });


    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            console.log('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try 
        {
            // https://university-student-psychiatrist.onrender.com/
            // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/uploadFile", formData, {
            const response = await axios.post(`${apiURL}/api/uploadFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
                withCredentials:true
            })
            console.log(response);
            if (response.status === 200) {
                console.log('File uploaded successfully');
                setSelectedFile(null); // Clear the selected file
            } else {
                console.log('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name.startsWith('notifications.')) 
        {
            const notifField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                notifications: {
                ...prev.notifications,
                [notifField]: type === 'checkbox' ? checked : value
                }
            }));
        } 
        else if (name === 'consultationDays') 
        {
            const day = value;
            setFormData(prev => ({
                ...prev,
                consultationDays: prev.consultationDays.includes(day)
                ? prev.consultationDays.filter(d => d !== day)
                : [...prev.consultationDays, day]
            }));
        } 
        else 
        {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        console.log('Form submitted:', formData);
        event.preventDefault();
        await handleImageSubmit();
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="min-h-screen bg-gradient-to-br dark:from-slate-800 from-blue-50 via-indigo-50  to-purple-50 dark:via-slate-800 dark:to-slate-800 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl dark:text-white font-bold text-gray-800 mb-2">Psychiatrist Profile Setup</h1>
                        <p className="text-gray-600 dark:text-white">Complete your professional details to get started</p>
                    </div>

                    <div className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold dark:text-white text-gray-800 flex items-center gap-2 border-b pb-2">
                                <User className="w-5 h-5 dark:text-white text-indigo-600" />
                                Personal Information
                            </h2>
                        
                            <div>
                                <label className="block text-sm dark:text-white font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Dr. John Smith"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block dark:text-white text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="+254 712 345 678"
                                    />
                                </div>

                                <div>
                                <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Office Location *
                                </label>
                                <input
                                    type="text"
                                    name="officeLocation"
                                    value={formData.officeLocation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Nairobi, Kenya"
                                />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm dark:text-white font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Biography *
                                </label>
                                <textarea
                                    name="biography"
                                    value={formData.biography}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Tell us about yourself, your approach to mental health care, and what drives your passion..."
                                />
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold dark:text-white text-gray-800 flex items-center gap-2 border-b pb-2">
                                <Briefcase className="w-5 h-5 dark:text-white text-indigo-600" />
                                Professional Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm  dark:text-white font-medium text-gray-700 mb-2">
                                        Specialization *
                                    </label>
                                    <input
                                        type="text"
                                        name="specilization"
                                        value={formData.specilization}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="e.g., Clinical Psychology, Child Psychiatry"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm dark:text-white font-medium text-gray-700 mb-2">
                                        Years of Experience *
                                    </label>
                                    <input
                                        type="number"
                                        name="yearsExperience"
                                        value={formData.yearsExperience}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="5"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                                    <GraduationCap className="w-4 h-4 dark:text-white inline mr-1" />
                                    Education *
                                </label>
                                <textarea
                                    name="Education"
                                    value={formData.Education}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="List your degrees, certifications, and educational background..."
                                />
                            </div>
                        </div>

                        {/* Consultation Schedule */}
                        <div className="space-y-6">
                            <h2 className="text-xl dark:text-white font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                                <Calendar className="w-5 h-5 dark:text-white text-indigo-600" />
                                Consultation Schedule
                            </h2>

                            <div>
                                <label className="block text-sm dark:text-white font-medium text-gray-700 mb-3">
                                    Consultation Days *
                                </label>
                                <div className="grid grid-cols-2  md:grid-cols-5 gap-3">
                                    {daysOfWeek.map(day => (
                                        <label
                                            key={day}
                                            className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                                                formData.consultationDays.includes(day)
                                                ? 'border-none bg-blue-700 text-indigo-700'
                                                : 'border-gray-300 hover:border-indigo-400'
                                            }`}
                                        >
                                        <input
                                            type="checkbox"
                                            name="consultationDays"
                                            value={day}
                                            checked={formData.consultationDays.includes(day)}
                                            onChange={handleChange}
                                            className="sr-only  bg-white border-2 border-red-700"
                                        />
                                        <span className="text-sm dark:text-white font-medium">{day.slice(0, 3)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Consultation Hours *
                                </label>
                                <input
                                    type="text"
                                    name="consultationHours"
                                    value={formData.consultationHours}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="e.g., 9:00 AM - 5:00 PM"
                                />
                            </div>
                        </div>

                        {/* Notification Preferences */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold dark:text-white text-gray-800 flex items-center gap-2 border-b pb-2">
                                <Bell className="w-5 h-5 dark:text-white text-indigo-600" />
                                Notification Preferences *
                            </h2>

                            <div className="space-y-4">
                                <label className="flex items-center dark:text-white gap-3 p-4 border border-gray-300 rounded-lg  cursor-pointer transition">
                                    <input
                                        type="checkbox"
                                        name="notifications.email"
                                        checked={formData.notifications.email}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-indigo-600 dark:text-white rounded focus:ring-indigo-500"
                                    />
                                    <div>
                                        <div className="font-medium dark:text-white text-gray-800">Email Notifications</div>
                                        <div className="text-sm dark:text-white text-gray-600">Receive updates via email</div>
                                    </div>
                                </label>

                                <label className="flex items-center dark:text-white gap-3 p-4 border border-gray-300 rounded-lg  cursor-pointer transition">
                                    <input
                                        type="checkbox"
                                        name="notifications.sms"
                                        checked={formData.notifications.sms}
                                        onChange={handleChange}
                                        className="w-5 h-5 dark:text-white text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <div>
                                        <div className="font-medium dark:text-white text-gray-800">SMS Notifications</div>
                                        <div className="text-sm dark:text-white text-gray-600">Receive text message alerts</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 dark:text-white p-4 border border-gray-300 rounded-lg  cursor-pointer transition">
                                    <input
                                        type="checkbox"
                                        name="notifications.alerts"
                                        checked={formData.notifications.alerts}
                                        className="w-5 h-5 text-indigo-600 dark:text-white rounded focus:ring-indigo-500"
                                        onChange={handleChange}
                                    />
                                    <div>
                                        <div className="font-medium dark:text-white text-gray-800">Push Alerts</div>
                                        <div className="text-sm dark:text-white text-gray-600">Receive in-app notifications</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 dark:text-white p-4 border border-gray-300 rounded-lg  cursor-pointer transition">
                                    <input
                                        type="checkbox"
                                        name="notifications.feedbackNotif"
                                        checked={formData.notifications.feedbackNotif}
                                        className="w-5 h-5 text-indigo-600 dark:text-white rounded focus:ring-indigo-500"
                                        onChange={handleChange}
                                    />
                                    <div>
                                        <div className="font-medium dark:text-white text-gray-800">Feedback Notifications</div>
                                        <div className="text-sm dark:text-white text-gray-600">Receive in-app notifications</div>
                                    </div>
                                </label>

                                <div className="mb-8 border-gray-300 border-1 p-4 rounded-xl">
                                    <form onSubmit={handleImageSubmit}>
                                        <input type="file" className="text-white" multiple={false} onChange={handleFileChange} />
                                    </form>
                                </div>

                                {/* <div>
                                    <label className="block text-sm dark:text-white font-medium text-gray-700 mb-2">
                                        Feedback Notifications *
                                    </label>
                                    <select
                                        name="notifications.feedbackNotif"
                                        value={formData.notifications.feedbackNotif}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    >
                                        <option value="">Select notification preference</option>
                                        <option value="immediate">Immediate</option>
                                        <option value="daily">Daily Summary</option>
                                        <option value="weekly">Weekly Summary</option>
                                        <option value="none">None</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-indigo-600 dark:text-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                            >
                                Save Profile
                            </button>
                            <button
                                onClick={() => console.log('Cancelled')}
                                className="px-6 py-3 border-2 dark:text-white border-gray-300 rounded-lg font-semibold text-gray-700  transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}