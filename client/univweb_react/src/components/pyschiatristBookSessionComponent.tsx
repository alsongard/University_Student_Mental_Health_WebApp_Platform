import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookCheck,  User, Phone, Video, MapPin, Search, Filter, CheckCircle, AlertCircle, X, MessageSquare, FileText } from 'lucide-react';
import axios from 'axios';

export default function PsychiatristBookedSessions() 
{
	const psychId = localStorage.getItem('psychId');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [selectedSession, setSelectedSession] = useState(null);
    const [showSessionDetails, setShowSessionDetails] = useState(false);

	const [psychBookedSessions, setPsychBookedSessions] = useState([])
	const getBookedSessions = async ()=>{
		try
		{
			// const response = await axios.get(`http://localhost:5000/api/bookSession/psychiatristViewBooked`, {withCredentials:true});
			const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/bookSession/psychiatristViewBooked`, {withCredentials:true});
			if (response.data.success)
			{
				setPsychBookedSessions(response.data.data);
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	};

	useEffect(()=>{
		getBookedSessions();
	}, []);

    // Sample booked sessions data
    const [bookedSessions] = useState(
		[
			{
				id: 1,
				sessionId: 101,
				studentName: "John Kamau",
				studentAdmissionNum: "ADM12345",
				studentEmail: "john.kamau@zetech.ac.ke",
				studentPhone: "+254 712 345 678",
				studentAge: 21,
				date: "2025-10-28",
				time: "10:00 AM",
				duration: 50,
				type: "Individual Therapy",
				mode: "In-Person",
				status: "confirmed",
				location: "Block B, Room 201",
				reason: "Dealing with academic stress and anxiety about upcoming exams",
				notes: "Student mentioned previous trauma, proceed with care",
				bookedDate: "2025-10-20",
				studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
			},
			{
				id: 2,
				sessionId: 102,
				studentName: "Sarah Johnson",
				studentAdmissionNum: "ADM12346",
				studentEmail: "sarah.johnson@zetech.ac.ke",
				studentPhone: "+254 722 456 789",
				studentAge: 20,
				date: "2025-10-28",
				time: "2:00 PM",
				duration: 50,
				type: "Individual Therapy",
				mode: "Virtual",
				status: "confirmed",
				reason: "Follow-up on previous session regarding relationship issues",
				bookedDate: "2025-10-15",
				studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
			},
			{
				id: 3,
				sessionId: 103,
				studentName: "Michael Chen",
				studentAdmissionNum: "ADM12347",
				studentEmail: "michael.chen@zetech.ac.ke",
				studentPhone: "+254 733 567 890",
				studentAge: 22,
				date: "2025-10-29",
				time: "9:00 AM",
				duration: 50,
				type: "Initial Consultation",
				mode: "In-Person",
				status: "pending",
				location: "Block B, Room 201",
				reason: "First-time consultation for anxiety management",
				bookedDate: "2025-10-22",
				studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
			},
			{
				id: 4,
				sessionId: 104,
				studentName: "Emily Davis",
				studentAdmissionNum: "ADM12348",
				studentEmail: "emily.davis@zetech.ac.ke",
				studentPhone: "+254 701 234 567",
				studentAge: 19,
				date: "2025-10-30",
				time: "11:00 AM",
				duration: 30,
				type: "Follow-up Session",
				mode: "Phone",
				status: "completed",
				reason: "Follow-up on medication side effects",
				completedDate: "2025-10-30",
				studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
			},
			{
				id: 5,
				sessionId: 105,
				studentName: "David Okonkwo",
				studentAdmissionNum: "ADM12349",
				studentEmail: "david.okonkwo@zetech.ac.ke",
				studentPhone: "+254 745 678 901",
				studentAge: 23,
				date: "2025-11-02",
				time: "3:00 PM",
				duration: 50,
				type: "Individual Therapy",
				mode: "Virtual",
				status: "confirmed",
				reason: "Addressing depression and low motivation",
				bookedDate: "2025-10-25",
				studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      		}
    	]
	);

    // Filter sessions
    const filteredSessions = psychBookedSessions.filter(session => {

		const matchesSearch = 
		session.studentId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
		session.studentId.studentAdmissionNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
		session.studentId.email.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesStatus = filterStatus === 'all' || session.sessionId.sessionStatus === filterStatus;
		
      	const today = new Date().toISOString().split('T')[0];
      	let matchesDate = true;
      
		if (filterDate === 'today')
		{
			matchesDate = new Date(session.sessionId.date).toISOString().split('T')[0] === today;
		} 
		else if (filterDate === 'upcoming') 
		{
			matchesDate = new Date(session.sessionId.date) > today;
		} 
		else if (filterDate === 'past') 
		{
			matchesDate = new Date(session.sessionId.date).toISOString().split('T')[0]  < today;
		}
      
      	return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusBadge = (status) => {
		const styles = {
			confirmed: 'bg-green-100 text-green-700 border border-green-300',
			pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
			completed: 'bg-blue-100 text-blue-700 border border-blue-300',
			cancelled: 'bg-red-100 text-red-700 border border-red-300',
			Available: 'bg-white text-green-300 border border-gren-700'
		};
      	return styles[status] || styles.pending;
    };

    const getStatusIcon = (status:String) => {
		switch(status) 
		{
			case 'confirmed':
				return <CheckCircle className="w-4 h-4" />;
			case 'pending':
				return <AlertCircle className="w-4 h-4" />;
			case 'completed':
				return <CheckCircle className="w-4 h-4" />;
			case 'cancelled':
				return <X className="w-4 h-4" />;
			case 'Available':
				return <BookCheck className="w-4 h-4" />
			default:
				return <AlertCircle className="w-4 h-4" />;
		}
    };

	const handleViewDetails = (session) => {
		setSelectedSession(session);
		setShowSessionDetails(true);
	};

	const isSessionUpcoming = (date) => {
		const sessionDate = new Date(date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return sessionDate >= today;
	};

	return (
		<div className="min-h-screen rounded-2xl dark:bg-slate-600 bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8 rounded-md  bg-linear-to-r from-gray-200 dark:from-slate-700 to-gray-200 dark:to-slate-400  py-5  px-5">
					<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Booked Sessions</h1>
					<p className="text-gray-600 dark:text-white">Manage and view all student booking sessions</p>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-6">
					<div className="bg-white dark:bg-slate-500  rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1 dark:text-white ">Total Bookings</p>
						<p className="text-3xl font-bold text-gray-900 dark:text-white">{psychBookedSessions.length}</p>
					</div>
					<div className="bg-white rounded-xl dark:bg-slate-500 shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1 dark:text-white">Confirmed</p> {/* will need to change the backend enum fields for booked sessions to Completed, Scheduled, Completed */}
						<p className="text-3xl font-bold text-green-600 dark:text-white">
						{bookedSessions.filter(s => s.sessionId.sessionStatus === 'Available').length}
						</p>
					</div>

					<div className="bg-white rounded-xl dark:bg-slate-500 shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1 dark:text-white">Pending</p>
						<p className="text-3xl font-bold dark:text-white text-yellow-600">
						{bookedSessions.filter(s => s.sessionId.sessionStatus === 'pending').length}
						</p>
					</div>
					<div className="bg-white rounded-xl dark:bg-slate-500 shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1 dark:text-white">Completed</p>
						<p className="text-3xl font-bold dark:text-white text-blue-600">
						{bookedSessions.filter(s => s.sessionId.sessionStatus === 'completed').length}
						</p>
					</div>
				</div>

				{/* Filters and Search */}
				<div className="bg-white dark:bg-slate-500 rounded-xl shadow-md p-6 mb-6">
					<div className="grid md:grid-cols-3 gap-4">
						<div className="relative">
							<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search by name, admission number, or email..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
							/>
						</div>

						<div className="relative">
						<Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<select
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
						>
							<option value="all">All Status</option>
							<option value="confirmed">Confirmed</option>
							<option value="pending">Pending</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
						</div>

						<div className="relative">
						<Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<select
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
						>
							<option value="all">All Dates</option>
							<option value="today">Today</option>
							<option value="upcoming">Upcoming</option>
							<option value="past">Past</option>
						</select>
						</div>
					</div>
				</div>

				{/* Sessions List */}
				<div className="bg-white rounded-xl shadow-md overflow-hidden">
				{
					filteredSessions.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Session Type</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Mode</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
									<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
								</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
								{
									filteredSessions.map((session) => (
										<tr key={session._id} className="hover:bg-gray-50 transition">
										<td className="px-6 py-4">
											<div className="flex  items-center space-x-3">
												<img
													src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
													alt={session.studentId._id.slice(0,2)}
													className="w-10 h-10 rounded-full object-cover"
												/>
												<div>
													<p className="font-semibold text-gray-900">{session.studentId.studentName}</p>
													<p className="text-sm text-gray-600">{session.studentId.studentAdmissionNum}</p>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center space-x-2 text-gray-900">
											<Calendar className="w-4 h-4 text-blue-600" />
											<div>
												<p className="font-medium">{new Date(session.sessionId.date).toISOString().split('T')[0]}</p>
												<p className="text-sm text-gray-600 flex items-center space-x-1">
												<Clock className="w-3 h-3" />
												<span>{session.sessionId.startTime}</span>
												</p>
											</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div>
											<p className="font-medium text-gray-900">{session.sessionId.sessionType}</p>
											<p className="text-sm text-gray-600">{session.sessionId.sessionDuration} minutes</p>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center space-x-2">
												{session.sessionId.sessionMode === 'Virtual' && <Video className="w-4 h-4 text-blue-600" />}
												{session.sessionId.sessionMode === 'In-Person' && <MapPin className="w-4 h-4 text-green-600" />}
												{session.sessionId.sessionMode === 'Phone' && <Phone className="w-4 h-4 text-purple-600" />}
											<span className="text-gray-900 text-sm">{session.sessionId.sessionMode}</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold w-fit ${getStatusBadge(session.sessionId.sessionType)}`}>
											{getStatusIcon(session.sessionId.sessionStatus)}
											<span className="capitalize">{session.sessionId.sessionStatus}</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-end space-x-2">
											<button
												onClick={() => handleViewDetails(session)}
												className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
											>
												View Details
											</button>
											{session.sessionId.status === 'confirmed' && isSessionUpcoming(session.date) && (
												<button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm">
													Start Session
												</button>
											)}
											</div>
										</td>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
					) : (
						<div className="text-center py-12">
							<Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<p className="text-gray-600 text-lg">No sessions found</p>
							<p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
						</div>
					)
				}
				</div>
			</div>

			{/* Session Details Modal */}
			{
				showSessionDetails && selectedSession && (
					<div className="fixed inset-0 bg-linear-to-tr from-slate-400 to-slate-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
							{/* Modal Header */}
							<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
									<h2 className="text-2xl font-bold">Session Details</h2>
								<button
									onClick={() => setShowSessionDetails(false)}
									className="p-2 hover:bg-blue-500 rounded-full transition"
								>
									<X className="w-6 h-6" />
								</button>
							</div>

							<div className="p-8">
							{/* Student Information */}
							<div className="mb-6">
								<h3 className="text-lg font-bold text-gray-900 mb-4">Student Information</h3>
								<div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
								<img
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
									alt={selectedSession.studentId.studentAdmissionNum}
									className="w-16 h-16 rounded-full object-cover"
								/>
								<div>
									<p className="text-lg font-bold text-gray-900">{selectedSession?.studentDetailsInfo?.studentName || ""}</p>
									<p className="text-gray-600">Admission: {selectedSession.studentId.studentAdmissionNum}</p>
									<p className="text-gray-600">Age: {selectedSession?.studentDetailsInfo?.studentAge || ""} years</p>
								</div>
								</div>
							</div>

							{/* Contact Information */}
							<div className="mb-6 p-4 bg-gray-50 rounded-lg">
								<h3 className="font-bold text-gray-900 mb-3">Contact Information</h3>
								<div className="space-y-2">
								<div className="flex items-center space-x-3">
									<Phone className="w-5 h-5 text-blue-600" />
									<div>
									<p className="text-xs text-gray-600">Phone</p>
									<p className="font-semibold text-gray-900">{selectedSession?.studentDetailsInfo?.phoneNumber}</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<MessageSquare className="w-5 h-5 text-blue-600" />
									<div>
									<p className="text-xs text-gray-600">Email</p>
									<p className="font-semibold text-gray-900 truncate">{selectedSession.studentId.email}</p>
									</div>
								</div>
								</div>
							</div>

							{/* Session Details */}
							<div className="mb-6">
								<h3 className="font-bold text-gray-900 mb-3">Session Information</h3>
								<div className="grid md:grid-cols-2 gap-4">
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Date</p>
									<p className="font-semibold text-gray-900 flex items-center space-x-2">
									<Calendar className="w-4 h-4 text-blue-600" />
									<span>{new Date(selectedSession.sessionId.date).toISOString().split('T')[0]}</span>
									</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Time</p>
									<p className="font-semibold text-gray-900 flex items-center space-x-2">
									<Clock className="w-4 h-4 text-blue-600" />
									<span>{selectedSession.sessionId.startTime}</span>
									</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Type</p>
									<p className="font-semibold text-gray-900">{selectedSession.sessionId.sessionType}</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Duration</p>
									<p className="font-semibold text-gray-900">{selectedSession.sessionId.sessionDuration} minutes</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Mode</p>
									<p className="font-semibold text-gray-900 flex items-center space-x-2">
									{selectedSession.sessionId.sessionMode === 'Virtual' && <Video className="w-4 h-4" />}
									{selectedSession.sessionId.sessionMode === 'In-Person' && <MapPin className="w-4 h-4" />}
									{selectedSession.sessionId.sessionMode === 'Phone' && <Phone className="w-4 h-4" />}
									<span>{selectedSession.sessionId.sessionMode}</span>
									</p>
								</div>
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Status</p>
									<div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedSession.sessionId.sessionStatus)}`}>
									{getStatusIcon(selectedSession.sessionId.sessionStatus)}
									<span className="capitalize">{selectedSession.sessionId.sessionStatus}</span>
									</div>
								</div>
								</div>
								{selectedSession.location && (
								<div className="mt-4 p-4 bg-gray-50 rounded-lg">
									<p className="text-xs text-gray-600 mb-1">Location</p>
									<p className="font-semibold text-gray-900 flex items-center space-x-2">
									<MapPin className="w-4 h-4 text-blue-600" />
									<span>{selectedSession.location}</span>
									</p>
								</div>
								)}
							</div>

							{/* Session Reason */}
							<div className="mb-6">
								<h3 className="font-bold text-gray-900 mb-3">Session Reason</h3>
								<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-gray-700">{selectedSession.reason} This part is not configured on Backend</p>
								</div>
							</div>

							{/* Notes */}
							{selectedSession.notes && (
								<div className="mb-6">
								<h3 className="font-bold text-gray-900 mb-3">
									<FileText className="w-5 h-5 inline mr-2" />
									Notes
								</h3>
								<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
									<p className="text-gray-700">{selectedSession.notes}</p>
								</div>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex space-x-4 pt-6 border-t border-gray-200">
								<button className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
									Send Message
								</button>
								{selectedSession.status === 'confirmed' && isSessionUpcoming(selectedSession.date) && (
								<button className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
									Start Session
								</button>
								)}
								<button
									onClick={() => setShowSessionDetails(false)}
									className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
								>
									Close
								</button>
							</div>
							</div>
						</div>
					</div>	
			)}
		</div>
  );
}