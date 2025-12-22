import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Stethoscope, CheckCircle, XCircle, AlertCircle, Video, MapPin, Phone } from 'lucide-react';

export default function ViewStudentBookedInfo(props) 
{
    const { bookedSession , setBook} = props;
    // console.log('Booked Session:');
    // console.log(bookedSession);
    
    // Sample data based on your response structure
    const [sessions] = useState([
        {
			_id: '6943f818e97935145fb46924',
			sessionId: {
				_id: '693c2d7f024e044c1eca3eed',
				date: '2025-12-31T00:00:00.000Z',
				sessionType: 'Group Therapy',
				startTime: '10:00 AM', // Add to your response
				endTime: '11:00 AM', // Add to your response
				location: 'Room 201, Wellness Center', // Add to your response
				meetingLink: 'https://meet.mindbridge.com/session-123' // Add to your response
			},
			studentId: '6903a4963253494881272acb',
			psychiatristId: { 
				_id: '692bbcb9946ace680fc7e177',
				phoneNumber: '+254 712 345 678', // Add to your response
				officeLocation: 'Nairobi Wellness Center' // Add to your response
			},
			status: 'scheduled',
			createdAt: '2025-12-18T12:48:24.634Z',
			updatedAt: '2025-12-18T12:48:24.634Z',
			fullName: 'Dr. Michael Chen',
			specilization: 'Depression & Anxiety',
			notes: 'Please arrive 10 minutes early' // Add to your response
        }
    ]);

    const getStatusColor = (status) => {
        const colors = {
			scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
			completed: 'bg-green-100 text-green-800 border-green-200',
			cancelled: 'bg-red-100 text-red-800 border-red-200',
			pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusIcon = (status) => {
        switch(status) {
			case 'scheduled': return <CheckCircle className="w-4 h-4" />;
			case 'completed': return <CheckCircle className="w-4 h-4" />;
			case 'cancelled': return <XCircle className="w-4 h-4" />;
			case 'pending': return <AlertCircle className="w-4 h-4" />;
			default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
			hour: '2-digit', 
			minute: '2-digit' 
        });
    };

	let remainingDaysToSession;
    const getDaysUntil = (dateString) => {
        const sessionDate = new Date(dateString);
        const today = new Date();
        const diffTime = sessionDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		remainingDaysToSession = diffDays;
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 0) return 'Past';
        return `In ${diffDays} days`;

    };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-800 from-blue-50 dark:via-slate-500 via-indigo-50 dark:to-slate-800 to-purple-50 p-6">
		<div className="max-w-5xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold dark:text-white text-gray-800 mb-2">My Booked Sessions</h1>
				<p className="text-gray-600 dark:text-white">Manage and view your upcoming therapy sessions</p>
			</div>

			{/* Sessions List */}
			<div className="space-y-6">
				<div 
					key={bookedSession._id} 
					className="bg-gradient-to-br from-white to-white dark:dark:from-slate-800 dark:to-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
				>
					{/* Session Header */}
					<div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-2">
									<Users className="w-6 h-6" />
									<h2 className="text-2xl dark:text-white font-bold">{bookedSession.sessionId.sessionType}</h2>
								</div>
								<div className="flex items-center gap-2 dark:text-white text-indigo-100">
									<Calendar className="w-4 h-4 dark:text-white" />
									<span className="font-medium ">{formatDate(bookedSession.sessionId.date)}</span>
									<span className="mx-2">•</span>
									<span className="text-sm">{getDaysUntil(bookedSession.sessionId.date)}</span>
								</div>
							</div>
							<div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(bookedSession.status)}`}>
								{getStatusIcon(bookedSession.status)}
								<span className="font-semibold capitalize">{bookedSession.status}</span>
							</div>
						</div>
					</div>

					{/* Session Details Grid */}
					<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">
						{/* Psychiatrist Info */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold dark:text-white text-gray-800 flex items-center gap-2 border-b pb-2">
								<Stethoscope className="w-5 h-5 dark:text-white text-indigo-600" />
								Psychiatrist Details
							</h3>
							
							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<User className="w-5 h-5 text-gray-400 mt-0.5" />
									<div>
										<p className="text-sm dark:text-white text-gray-600">Doctor</p>
										<p className="font-semibold dark:text-white text-gray-800">{bookedSession.fullName}</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Stethoscope className="w-5 h-5 text-gray-400 mt-0.5" />
									<div>
										<p className="text-sm dark:text-white text-gray-600">Specialization</p>
										<p className="font-semibold dark:text-white text-gray-800">{bookedSession.specilization}</p>
									</div>
								</div>

								{sessions[0].psychiatristId.phoneNumber && (
									<div className="flex items-start gap-3">
										<Phone className="w-5 h-5  text-gray-400 mt-0.5" />
										<div>
											<p className="text-sm dark:text-white text-gray-600">Contact</p>
											<p className="font-semibold dark:text-white text-gray-800">{sessions[0].psychiatristId.phoneNumber}</p>
										</div>
									</div>
								)}

								{sessions[0].psychiatristId.officeLocation && (
									<div className="flex items-start gap-3">
										<MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
										<div>
											<p className="text-sm dark:text-white text-gray-600">Office</p>
											<p className="font-semibold dark:text-white text-gray-800">{sessions[0].psychiatristId.officeLocation}</p>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Session Info */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold dark:text-white text-gray-800 flex items-center gap-2 border-b pb-2">
								<Clock className="w-5 h-5 text-indigo-600" />
								Session Information
							</h3>
							
							<div className="space-y-3">
								{
									bookedSession.sessionId.startTime && bookedSession.sessionId.endTime && (
									<div className="flex items-start gap-3">
										<Clock className="w-5 h-5 text-gray-400 mt-0.5" />
										<div>
											<p className="text-sm dark:text-white text-gray-600">Time</p>
											<p className="font-semibold dark:text-white text-gray-800">
												{bookedSession.sessionId.startTime} - {bookedSession.sessionId.endTime}
											</p>
										</div>
									</div>
								)}

								
								{
									sessions[0].sessionId.location && (
										<div className="flex items-start gap-3">
											<MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
											<div>
												<p className="text-sm dark:text-white text-gray-600">Location</p>
												<p className="font-semibold dark:text-white text-gray-800">{sessions[0].sessionId.location}</p>
											</div>
										</div>
								)}

								{
									sessions[0].sessionId.meetingLink && (
										<div className="flex items-start gap-3">
											<Video className="w-5 h-5 text-gray-400 mt-0.5" />
											<div>
												<p className="text-sm dark:text-white text-gray-600">Virtual Meeting</p>
												<a 
													href={sessions[0].sessionId.meetingLink}
													target="_blank"
													rel="noopener noreferrer"
													className="font-semibold text-indigo-600 dark:text-purple-300 hover:text-indigo-700 underline"
												>
													Join Session
												</a>
											</div>
										</div>
									)
								}

								<div className="flex items-start gap-3">
									<Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
									<div>
										<p className="text-sm dark:text-white text-gray-600">Booked On</p>
										<p className="font-semibold dark:text-white text-gray-800">{formatDate(bookedSession.createdAt)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Notes Section */}
					{sessions[0].notes && (
						<div className="px-6 pb-6">
							<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
								<p className="text-sm font-medium text-yellow-800 mb-1">Important Note</p>
								<p className="text-sm text-yellow-700">{sessions[0].notes}</p>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="px-6 pb-6 flex gap-3">
						<>
							<button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
								View Details
							</button>
							{
								remainingDaysToSession > 10
								&&
								(
									<button className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition">
										Reschedule
									</button>

								)
							}
							<button
								onClick={()=>{setBook(false)}}
								className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
							>
								Cancel
							</button>
						</>
						{/* <button	
							className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
						>
							View Session Summary
						</button>
						<button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md">
							Book New Session
						</button> */}
					</div>
					</div>
				</div>
			</div>
		</div>
  );
}