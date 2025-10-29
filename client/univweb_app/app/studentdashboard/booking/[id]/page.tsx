'use client'
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, CheckCircle } from 'lucide-react';
export default function SimpleBookingForm()
{
    const [formData, setFormData] = useState({
        reason: '',
        preferredMode: 'In-Person',
        additionalNotes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // This would be fetched based on session ID from the URL
    const [sessionData, setSessionData ] = useState({
        id: "",
        psychiatristName: "",
        date: "",
        time: "",
        type: "",
        mode: ""
    });
    useEffect(()=>{
        setSessionData({
            id: 1,
            psychiatristName: "Dr. Sarah Mwangi",
            date: "2025-10-28",
            time: "10:00 AM",
            type: "Individual Therapy",
            mode: "In-Person"
        })
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = {
        ...sessionData,
        ...formData,
        status: "confirmed"
        };
        console.log('Booking Data:', bookingData);
        setSubmitted(true);
    };

    if (submitted)
    {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
                Your session has been successfully booked. A confirmation email has been sent to you.
            </p>
            <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
                Back to Sessions
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50  p-4 w-full ">
            <div className="bg-white rounded-2xl  shadow-lg w-full p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Session</h1>
                <p className="text-gray-600 mb-8">Review the session details and confirm your booking</p>

                {/* Session Details Summary */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Session Details</h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Psychiatrist</p>
                                <p className="font-semibold text-gray-900">{sessionData.psychiatristName}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Date</p>
                                <p className="font-semibold text-gray-900">{sessionData.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Time</p>
                                <p className="font-semibold text-gray-900">{sessionData.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Video className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Session Type</p>
                                <p className="font-semibold text-gray-900">{sessionData.type}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Reason for Session *
                        </label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="Please briefly describe what you'd like to discuss..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Preferred Mode *
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <label className={`border-2 rounded-lg p-4 cursor-pointer transition text-center ${
                                formData.preferredMode === 'In-Person'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-600'
                            }`}>
                                <input
                                    type="radio"
                                    name="preferredMode"
                                    value="In-Person"
                                    checked={formData.preferredMode === 'In-Person'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                <p className="font-semibold text-gray-900 text-sm">In-Person</p>
                            </label>

                            <label className={`border-2 rounded-lg p-4 cursor-pointer transition text-center ${
                                formData.preferredMode === 'Virtual'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-600'
                            }`}>
                                <input
                                type="radio"
                                name="preferredMode"
                                value="Virtual"
                                checked={formData.preferredMode === 'Virtual'}
                                onChange={handleChange}
                                className="sr-only"
                                />
                                <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                <p className="font-semibold text-gray-900 text-sm">Virtual</p>
                            </label>

                            <label className={`border-2 rounded-lg p-4 cursor-pointer transition text-center ${
                                formData.preferredMode === 'Phone'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-600'
                            }`}>
                            <input
                                type="radio"
                                name="preferredMode"
                                value="Phone"
                                checked={formData.preferredMode === 'Phone'}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <p className="font-semibold text-gray-900 text-sm">Phone</p>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="Any other information you'd like to share..."
                        />
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Please arrive 10 minutes early for in-person sessions. 
                        For virtual sessions, you'll receive a meeting link via email.
                        </p>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                        Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}
