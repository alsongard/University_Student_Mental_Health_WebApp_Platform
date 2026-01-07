import React, { useState } from 'react';
import { User, Calendar, Clock, Video, MapPin, Phone, Shield, Heart, Star, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
export default function StudentFeedbackForm(props)
{
    // Sample session data - replace with actual data from props/API
    let {sessionData, setFeedBack} = props;
    // console.log('this is session Data');
    // console.log(sessionData);
    // sessionData = {
    //         fullName: 'Dr. Michael Chen',
    //         specialization: 'Depression & Anxiety',
    //         profileImage: null, // Add image URL if available
    //         session: {
    //         date: '2025-12-18T00:00:00.000Z',
    //         startTime: '10:00 AM',
    //         endTime: '11:00 AM',
    //         timeZone: 'EAT',
    //         duration: 60,
    //         mode: 'Virtual', // In-Person/Virtual/Phone
    //         type: 'Individual Therapy',
    //         typeDescription: 'One-on-one counseling session focused on your personal mental health needs and goals.'
    //     }
    // };

    const [feedback, setFeedback] = useState({
        rating: 0,
        isAnonymous: true,
        message: ''
    });

    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFeedback(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRatingClick = (rating) => {
        setFeedback(prev => ({ ...prev, rating }));
    };

    const handleSubmit = async () => {
        if (feedback.rating === 0)
        {
            setSubmitMessage('Please provide a rating before submitting');
            setTimeout(()=>{
                setSubmitMessage("")
            }, 5000);
            return;
        }

        if (!feedback.message.trim())
        {
            setSubmitMessage('Please write your feedback before submitting');
            setTimeout(()=>{
                setSubmitMessage("")
            }, 5000);
            return;
        }

        setIsSubmitting(true);
        // setSubmitMessage('');

        try 
        {
            // Add your API call here  
            // https://university-student-psychiatrist.onrender.com
            // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/feedback/createFeedback", 
            const response = await axios.post("http://localhost:5000/api/feedback/createFeedback", 
                {
                    sessionId: sessionData.sessionId._id,
                    psychiastricId: sessionData.psychiatristId._id,
                    bookingId: sessionData._id,
                    rating: feedback.rating,
                    feedbackMessage: feedback.message,
                    anonymity: feedback.isAnonymous,
                },
                {withCredentials:true}
            );
            if (response.data.success)
            {
                setSubmitMessage('Thank you! Your feedback has been submitted successfully.');
                setTimeout(()=>{
                    setSubmitMessage("")
                    setFeedback({ rating: 0, isAnonymous: true, message: '' });
                    setFeedBack(false);
                }, 5000);
            }
        } 
        catch (error) 
        {
            setSubmitMessage('Failed to submit feedback. Please try again.');
            setTimeout(()=>{
                setSubmitMessage("")
            }, 5000)
        } 
        finally 
        {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        return `${formattedDate} • ${dayOfWeek}`;
    };

    const getModeIcon = (mode) => {
        switch(mode) {
        case 'Virtual': return <Video className="w-5 h-5 text-indigo-600" />;
        case 'In-Person': return <MapPin className="w-5 h-5 text-indigo-600" />;
        case 'Phone': return <Phone className="w-5 h-5 text-indigo-600" />;
        default: return <Video className="w-5 h-5 text-indigo-600" />;
        }
    };

    const getRatingLabel = (rating) => {
        const labels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
        };
        return labels[rating] || '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">Session Feedback</h1>
                        <p className="text-indigo-100">Help us improve your therapy experience</p>
                    </div>

                    <div className="p-8 space-y-8">
                        
                        {/* Psychiatrist Information */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-6 h-6 text-indigo-600" />
                                Your Psychiatrist
                            </h2>
                        
                            <div className="flex items-center gap-4">
                                {sessionData.profileImage ? (
                                    <img 
                                        src={sessionData.profileImage} 
                                        alt={sessionData.fullName}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    ) : (
                                    <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                        {sessionData.fullName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    )
                                }
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {sessionData.fullName}
                                    </h3>
                                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                                        <Heart className="w-4 h-4 text-indigo-600" />
                                        {sessionData.specilization}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Session Details */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-indigo-600" />
                                Session Details
                            </h2>
                        
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                {/* Date & Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                                        <p className="text-gray-800 font-semibold">
                                        {formatDate(sessionData.sessionId.date)}
                                        </p>
                                    </div>
                                
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Time</p>
                                        <p className="text-gray-800 font-semibold flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                        {/* {sessionData.sessionId.startTime} - {sessionData.sessionId.endTime} ({sessionData.session.timeZone}) */}
                                        {sessionData.sessionId.startTime} - {sessionData.sessionId.endTime} 
                                        </p>
                                    </div>
                                </div>

                                {/* Duration, Mode, Type */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
                                        <p className="text-gray-800 font-semibold">{sessionData.sessionId.sessionDuration} </p>
                                    </div>
                                
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Mode</p>
                                        <p className="text-gray-800 font-semibold flex items-center gap-2">
                                        {getModeIcon(sessionData.sessionId.mode)}
                                        {sessionData.sessionId.sessionMode}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                                        <p className="text-gray-800 font-semibold">{sessionData.sessionId.sessionType}</p>
                                    </div>
                                </div>

                                {/* Session Context */}
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-500 mb-2">Session Context</p>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {/* {sessionData.session.typeDescription} */}
                                        One-on-one counseling session focused on your personal mental health needs and goals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Emotional Safety Banner */}
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-green-900 text-lg mb-2">Your Privacy Matters</h3>
                                    <div className="space-y-2 text-sm text-green-800">
                                        <p className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Your feedback helps improve our service
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            All feedback is anonymous by default
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            This feedback is confidential
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Form */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                                <Star className="w-6 h-6 text-indigo-600" />
                                Your Feedback
                            </h2>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How would you rate this session? *
                                </label>
                                <div className="flex items-center gap-2">
                                {
                                    [1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingClick(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                className={`w-12 h-12 transition-colors ${
                                                star <= (hoveredRating || feedback.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                            />
                                        </button>
                                    ))
                                }
                                </div>
                                {(hoveredRating || feedback.rating) > 0 && (
                                <p className="text-sm text-gray-600 mt-2 font-medium">
                                    {getRatingLabel(hoveredRating || feedback.rating)}
                                </p>
                                )}
                            </div>

                            {/* Anonymity Toggle */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isAnonymous"
                                        checked={feedback.isAnonymous}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mt-0.5"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-indigo-600" />
                                            Submit feedback anonymously
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Your identity will not be shared with your psychiatrist
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Feedback Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Share your thoughts about the session *
                                </label>
                                <textarea
                                    name="message"
                                    value={feedback.message}
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="What went well? What could be improved? How did you feel during the session?"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    {feedback.message.length} / 1000 characters
                                </p>
                            </div>

                            {/* Submit Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-lg ${
                                    submitMessage.includes('success')
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        {submitMessage.includes('success') ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5" />
                                        )}
                                        <span className="font-medium">{submitMessage}</span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || feedback.rating === 0 || !feedback.message.trim()}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                                isSubmitting || feedback.rating === 0 || !feedback.message.trim()
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}