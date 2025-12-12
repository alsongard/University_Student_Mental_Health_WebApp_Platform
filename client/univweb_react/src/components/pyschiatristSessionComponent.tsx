import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X, Calendar, Clock, Video, MapPin, User, Search } from 'lucide-react';
import axios from 'axios';

export default function PsychiatristSessionsManagement() 
{
	const psychId = localStorage.getItem('psychId');
	const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'view'
	const [sessions, setSessions] = useState([]);
  
	const getPsychiatristSessions = async ()=>{
		try
		{
			const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/psychiatristSession/viewSession/${psychId}`)
			if (response.data.success)
			{
				setSessions(response.data.data);
				// console.log('this is response.data.data');
				// console.log(response.data.data);
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	}
	useEffect(()=>{
		getPsychiatristSessions();
	}, []);
	
	const [selectedSession, setSelectedSession] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
  
	const [formData, setFormData] = useState({
		date: '',
		startTime: '',
		endTime: '',
		type: 'Individual Therapy',
		mode: 'In-Person',
		duration:'2h 30min',
		status:"Available",
		maxBookings: 1
	});

	const sessionTypes = [
		'Individual Therapy',
		'Follow-up Session',
		'Initial Consultation',
		'Medication Management',
		'Group Therapy'
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const [successMessage, setSuccessMessage] = useState(false);
	const handleCreate = async (e) => {
		e.preventDefault();
		try
		{
			const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/psychiatristSession/createSession", {
				psychiatristId: psychId,
				date:formData.date,
				startTime: formData.startTime,
				endTime:formData.endTime,
				sessionType:formData.type,
				sessionMode:formData.mode,
				sessionDuration: formData.duration,
				sesionStatus: formData.status,
				maxBookings: formData.maxBookings
			})
			if (response.data.success)
			{
				setSuccessMessage(true);
				setTimeout(()=>{
					setSuccessMessage(false)
					resetForm();
					setView('list');
				}, 6000)

			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	};

	const handleEdit = (session) => {
		setSelectedSession(session);
		setFormData({
			date: new Date(session.date).toISOString().split("T")[0],
			startTime: session.startTime.split(" ")[0],
			endTime: session.endTime.split(" ")[0],
			type: session.sessionType,
			mode: session.sessionMode,
			duration: session.sessionDuration,
			status: session.sessionStatus,
			maxBookings: session.maxBookings
		});
		setView('edit');
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		setSessions(sessions.map(s => 
			s.id === selectedSession.id 
				? { ...s, ...formData }
				: s
		));
		setView('list');
		resetForm();
	};

	const handleDelete = async (id:String) => {
		const confirmResult = confirm("Are you sure you want to delete this session");
		try
		{
			if (confirmResult) // true
			{
				// const response = await axios.delete(`http://localhost:5000/api/psychiatristSession/deleteSession/${id}`)
				const response = await axios.delete(`https://university-student-psychiatrist.onrender.com/api/psychiatristSession/deleteSession/${id}`)
				console.log(`response`);
				console.log(response);
				if (response.data.success)
				{
					alert("Session Deleted Successfully");
					// Refresh the sessions list after deletion
					getPsychiatristSessions();
				}
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`)
		}
		
	};

	const handleView = (session) => {
		setSelectedSession(session);
		setView('view');
	};

	const resetForm = () => {
		setFormData({
			date: '',
			startTime: '',
			endTime: '',
			type: 'Individual Therapy',
			mode: 'In-Person',
			duration:'2h 30min',
			status:"Available",
			maxBookings: 1
		});
		setSelectedSession(null);
	};

	const todaySessions = sessions.filter((sessionInfo)=>{
		const today = new Date();
		const theDate = new Date(sessionInfo.date);
		if (theDate >= today)
		{
			return sessionInfo;
		}
	})

	const filteredSessions = todaySessions.length > 0 &&
	(
		todaySessions.filter(session => {
			const matchesSearch = 
			session.sessionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
			session.date.includes(searchQuery) ||
			session.startTime.toLowerCase().includes(searchQuery.toLowerCase());
			
			const matchesFilter = 
			filterStatus === 'all' || session.sessionStatus === filterStatus;
			
			return matchesSearch && matchesFilter;
		}
	))



	// View Session Details // When you click the eye thing 
	if (view === 'view' && selectedSession) {
		return (
			<div className="min-h-screen bg-gray-50 p-8">
				<div className="max-w-3xl mx-auto">
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
							<button
								onClick={() => setView('list')}
								className="p-2 hover:bg-gray-100 rounded-full transition"
							>
								<X className="w-6 h-6 text-gray-600" />
							</button>
						</div>

						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div className="bg-blue-50 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Calendar className="w-5 h-5 text-blue-600" />
										<p className="text-sm text-gray-600">Date</p>
									</div>
									<p className="font-bold text-gray-900 text-lg">{new Date(selectedSession.date).toISOString().split("T")[0]}</p>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Clock className="w-5 h-5 text-blue-600" />
										<p className="text-sm text-gray-600">Time</p>
									</div>
									<p className="font-bold text-gray-900 text-lg">{selectedSession.startTime} - {selectedSession.endTime}</p>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<User className="w-5 h-5 text-blue-600" />
										<p className="text-sm text-gray-600">Session Type</p>
									</div>
									<p className="font-bold text-gray-900">{selectedSession.sessionType}</p>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Video className="w-5 h-5 text-blue-600" />
										<p className="text-sm text-gray-600">Mode</p>
									</div>
									<p className="font-bold text-gray-900">{selectedSession.sessionMode}</p>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<p className="text-sm text-gray-600 mb-2">Duration</p>
									<p className="font-bold text-gray-900">{selectedSession.sessionDuration} </p>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<p className="text-sm text-gray-600 mb-2">Status</p>
									<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
										selectedSession.sessionStatus === 'Available' 
										? 'bg-green-100 text-green-700' 
										: 'bg-blue-100 text-blue-700'
									}`}>
										{selectedSession.sessionStatus}
									</span>
								</div>

								<div className="bg-blue-50 rounded-lg p-4">
									<p className="text-sm text-gray-600 mb-2">Bookings</p>
									<p className="font-bold text-gray-900">
										{selectedSession.currentBookings} / {selectedSession.maxBookings}
									</p>
								</div>
							</div>


						<div className="flex space-x-4 pt-6 border-t border-gray-200">
							<button
								onClick={() => setView('list')}
								className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
							>
								Close
							</button>
						</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Create/Edit Form // so the eintire functionality lies here for the page on create and edit
	if (view === 'create' || view === 'edit') {
		return (
			<div className="min-h-screen bg-gray-50 p-8">
				<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-2xl shadow-lg p-8">
					<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-gray-900">
						{view === 'create' ? 'Create New Session' : 'Edit Session'}
					</h2>
					<button
						onClick={() => {
							setView('list');
							resetForm();
						}}
						className="p-2 hover:bg-gray-100 rounded-full transition"
					>
						<X className="w-6 h-6 text-gray-600" />
					</button>
					</div>

					<div className="space-y-6">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Date *
								</label>
								<input
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									min={new Date().toISOString().split('T')[0]}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Start Time *
								</label>
								<input
									type="time"
									name="startTime"
									value={formData.startTime}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									End Time *
								</label>
								<input
									type="time"
									name="endTime"
									value={formData.endTime}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
								
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Duration *
								</label>
								<input
									type="text"
									name="duration"
									value={formData.duration}
									onChange={handleChange}
									placeholder='2h 30min'
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
								
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Session Type *
								</label>
								<select
									name="type"
									value={formData.type}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								>
									{sessionTypes.map(type => (
									<option key={type} value={type}>{type}</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Mode *
								</label>
								<select
									name="mode"
									value={formData.mode}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								>
									<option value="In-Person">In-Person</option>
									<option value="Virtual">Virtual</option>
									<option value="Phone">Phone</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Max Bookings *
								</label>
								<input
									type="number"
									name="maxBookings"
									value={formData.maxBookings}
									onChange={handleChange}
									min={1}
									max={10}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Session Status *
								</label>
								<select 
									name='status'
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								>
									<option value='Available'>Available</option>
									<option value='Booked'>Booked</option>
									<option value='Pending'>Pending</option>
								</select>
							</div>

						</div>

						<div className="flex space-x-4 pt-6 border-t border-gray-200">
							<button
								onClick={() => {
									setView('list');
									resetForm();
								}}
								className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
							>
								Cancel
							</button>
							<button
								onClick={view === 'create' ? handleCreate : handleUpdate}
								className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
							>
								{view === 'create' ? 'Create Session' : 'Update Session'}
							</button>
						</div>
						{
							successMessage &&
							(
								<p className='bg-green-600 py-3  px-5 rounded-lg text-[15px]'>New Session Successfuly created</p>
							)
						}

					</div>
				</div>
				</div>
			</div>
		);
	}

  // List View (Default)
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Sessions</h1>
					<p className="text-gray-600">Create and manage your available session slots</p>
				</div>
				<button
					onClick={() => setView('create')}
					className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md"
				>
					<Plus className="w-5 h-5" />
					<span>Create Session</span>
				</button>
				</div>

				{/* Filters and Search */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6">
					<div className="grid md:grid-cols-2 gap-4">
						<div className="relative">
							<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search by date, time, or type..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
							/>
						</div>
						<div>
							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
							>
								<option value="all">All Status</option>
								<option value="available">Available</option>
								<option value="booked">Booked</option>
							</select>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="grid md:grid-cols-4 gap-6 mb-6">
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">Total Sessions</p>
						<p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
					</div>
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">Available</p>
						<p className="text-3xl font-bold text-green-600">
							{todaySessions ? todaySessions.length : 0}
						</p>
					</div>
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">Booked</p>
						<p className="text-3xl font-bold text-blue-600">
							{sessions.filter(s => s.sessionStatus === 'Booked').length}
						</p>
					</div>
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">This Week</p>
						<p className="text-3xl font-bold text-purple-600">
							{sessions.filter(s => new Date(s.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}  
							{/*new D[zate() seconds + (7 * 24 === hours on 7 days, multiple by minutes:60, multiply by seconds:60, multiply by milliseconds:1000)  */}
						</p>
					</div>
				</div>

				{/* Sessions List */}
				<div className="bg-white rounded-xl shadow-md overflow-hidden">
					{
						sessions.length > 0 ? 
						(
							<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Mode</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Bookings</th>
									<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
								</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
								{filteredSessions.map((session) => (
									<tr key={session._id} className="hover:bg-gray-50 transition">
									<td className="px-6 py-4">
										<div>
										<p className="font-semibold text-gray-900">{new Date(session.date).toISOString().split("T")[0]} </p>
										<p className="text-sm text-gray-600">{session.startTime} - {session.endTime}</p>
										</div>
									</td>
									<td className="px-6 py-4">
										<p className="text-gray-900">{session.sessionType}</p>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center space-x-2">
											{session.sessionMode === 'Virtual' && <Video className="w-4 h-4 text-blue-600" />}
											{session.sessionMode === 'In-Person' && <MapPin className="w-4 h-4 text-green-600" />}
											{session.sessionMode === 'Phone' && <User className="w-4 h-4 text-purple-600" />}
											<span className="text-gray-900 text-[15px]">{session.sessionMode}</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<p className="text-gray-900">{session.sessionDuration}</p>
									</td>
									<td className="px-6 py-4">
										<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
											session.sesionStatus === 'available' 
												? 'bg-green-100 text-green-700' 
												: 'bg-blue-100 text-blue-700'
											}`
										}>
										{session.sessionStatus}
										</span>
									</td>
									<td className="px-6 py-4">
										<p className="text-gray-900">
										{0}/{session.maxBookings}
										</p>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center justify-end space-x-2">
										<button
											onClick={() => 
											{
												// console.log('this is the sesion being passed for view details')
												// console.log(session);
												handleView(session)}
											}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
											title="View"
										>
											<Eye className="w-5 h-5" />
										</button>
										<button
											onClick={() => handleEdit(session)}
											className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
											title="Edit"
										>
											<Edit className="w-5 h-5" />
										</button>
										<button
											onClick={() => handleDelete(session._id)}
											className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
											title="Delete"
										>
											<Trash2 className="w-5 h-5" />
										</button>
										</div>
									</td>
									</tr>
								))}
								</tbody>
							</table>
							</div>
						)
						: 
							(
							<div className="text-center py-12">
								<Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
								<p className="text-gray-600 text-lg">No sessions found</p>
								<p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
								</div>
							)
					}
				</div>
			</div>
		</div>
  );
}