import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X, Calendar, Clock, Video, MapPin, User, Search } from 'lucide-react';
import axios from 'axios';
import TableRowSkeleton from "../components/skeletons/psychiatristSessionSkeleton";

export default function PsychiatristSessionsManagement(props:any) 
{
	const apiURL = import.meta.env.VITE_API_URL;
	const {refreshView} = props;
	const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'view'
	const [sessions, setSessions] = useState([]);
  
	const getPsychiatristSessions = useCallback(async ()=>{
		try
		{
			// const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/psychiatristSession/viewSession`, {withCredentials:true})
			const response = await axios.get(`${apiURL}/api/psychiatristSession/viewSession`, {withCredentials:true})
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
	}, []);

	useEffect(()=>{
		getPsychiatristSessions();
	}, [refreshView.sessions]);
	
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
		maxBookings: 1,
		sessionDescription: ""
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
	const [errorMessage, setErrorMessage] = useState("");
	const handleCreate = async (e) => {
		e.preventDefault();
		try
		{
			// const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/psychiatristSession/createSession", {
			const response = await axios.post(`${apiURL}/api/psychiatristSession/createSession`, {
				date:formData.date,
				startTime: formData.startTime,
				endTime:formData.endTime,
				sessionType:formData.type,
				sessionMode:formData.mode,
				sessionDuration: formData.duration,
				sesionStatus: formData.status,
				maxBookings: formData.maxBookings,
				description: formData.sessionDescription
			}, {withCredentials:true})
			if (response.data.success)
			{
				setSuccessMessage(true);
				setTimeout(()=>{
					setSuccessMessage(false)
					resetForm();
					setView('list');
				}, 4000)

			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
			if (err.data.response.msg)
			{
				setErrorMessage(err.data.response.msg);
			}
			setTimeout(()=>{
				setErrorMessage('');
			}, 4000)
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
			maxBookings: session.maxBookings,
			sessionDescription: session.sessionDescription
		});
		setView('edit');
	};

	const [updateSuccess, setUpdateSuccess] = useState("");
	const handleUpdate = async (event) => {
		event.preventDefault();
		console.log("formData");
		// console.log(formData);
		console.log('selected session Id');
		// console.log(selectedSession._id);
		try
		{
			const response = await axios.put(`${apiURL}/api/psychiatristSession/updateSession/${selectedSession._id}`, {
				date:formData.date,
				startTime: formData.startTime,
				endTime:formData.endTime,
				sessionType:formData.type,
				sessionMode:formData.mode,
				sessionDuration: formData.duration,
				sessionStatus: formData.status,
				maxBookings: formData.maxBookings,
				description: formData.sessionDescription
				}, {withCredentials:true});

			
			console.log("response");
			// console.log(response.data);
			if (response.data.success)
			{
				setUpdateSuccess("Session Updated Successfully");
				setTimeout(()=>{
					setUpdateSuccess("");
					setView('list');
					resetForm();
				},4000)
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
			if (err.response.data.msg)
			{
				setErrorMessage(err.response.data.msg);
			};
			setTimeout(()=>{
				setErrorMessage('');
			}, 4000)
		}
		// setSessions(sessions.map(s => 
		// 	s.id === selectedSession.id 
		// 		? { ...s, ...formData }
		// 		: s
		// ));
	
	};

	const handleDelete = async (id:String) => {
		const confirmResult = confirm("Are you sure you want to delete this session");
		try
		{
			if (confirmResult) // true
			{
				// const response = await axios.delete(`https://university-student-psychiatrist.onrender.com/api/psychiatristSession/deleteSession/${id}`, {withCredentials:true})
				const response = await axios.delete(`${apiURL}/api/psychiatristSession/deleteSession/${id}`, {withCredentials:true})
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
			maxBookings: 1,
			sessionDescription: ""
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
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
				<div className="max-w-3xl mx-auto">
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Details</h2>
							<button
								onClick={() => setView('list')}
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
							>
								<X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
							</button>
						</div>

						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
									</div>
									<p className="font-bold text-gray-900 dark:text-white text-lg">{new Date(selectedSession.date).toISOString().split("T")[0]}</p>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
									</div>
									<p className="font-bold text-gray-900 dark:text-white text-lg">{selectedSession.startTime} - {selectedSession.endTime}</p>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Session Type</p>
									</div>
									<p className="font-bold text-gray-900 dark:text-white">{selectedSession.sessionType}</p>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-2">
										<Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-gray-600 dark:text-gray-400">Mode</p>
									</div>
									<p className="font-bold text-gray-900 dark:text-white">{selectedSession.sessionMode}</p>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duration</p>
									<p className="font-bold text-gray-900 dark:text-white">{selectedSession.sessionDuration}</p>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
									<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
										selectedSession.sessionStatus === 'Available' 
										? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
										: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
									}`}>
										{selectedSession.sessionStatus}
									</span>
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Bookings</p>
									<p className="font-bold text-gray-900 dark:text-white">
										{selectedSession.currentBookings} / {selectedSession.maxBookings}
									</p>
								</div>
							</div>

							<div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
								<button
									onClick={() => setView('list')}
									className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
				<div className="w-full mx-auto">
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								{view === 'create' ? 'Create New Session' : 'Edit Session'}
							</h2>
							<button
								onClick={() => {
									setView('list');
									resetForm();
								}}
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
							>
								<X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
							</button>
						</div>

						<div className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Date *
									</label>
									<input
										type="date"
										name="date"
										value={formData.date}
										onChange={handleChange}
										min={new Date().toISOString().split('T')[0]}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Start Time *
									</label>
									<input
										type="time"
										name="startTime"
										value={formData.startTime}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										End Time *
									</label>
									<input
										type="time"
										name="endTime"
										value={formData.endTime}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Duration *
									</label>
									<input
										type="text"
										name="duration"
										value={formData.duration}
										onChange={handleChange}
										placeholder='2h 30min'
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Session Type *
									</label>
									<select
										name="type"
										value={formData.type}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									>
										{sessionTypes.map(type => (
											<option key={type} value={type}>{type}</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Mode *
									</label>
									<select
										name="mode"
										value={formData.mode}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									>
										<option value="In-Person">In-Person</option>
										<option value="Virtual">Virtual</option>
										<option value="Phone">Phone</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Max Bookings *
									</label>
									<input
										type="number"
										name="maxBookings"
										value={formData.maxBookings}
										onChange={handleChange}
										min={1}
										max={10}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Session Status *
									</label>
									<select 
										name='status'
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
									>
										<option value='Available'>Available</option>
										<option value='Booked'>Booked</option>
										<option value='Pending'>Pending</option>
									</select>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
									Session Description *
								</label>
								<textarea
									name="sessionDescription"
									value={formData.sessionDescription}
									onChange={handleChange}
									rows="6"
									placeholder="What went well? What could be improved? How did you feel during the session?"
									className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition resize-none"
								/>
							</div>

							<div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
								<button
									onClick={() => {
										setView('list');
										resetForm();
									}}
									className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
								>
									Cancel
								</button>
								<button
									onClick={view === 'create' ? handleCreate : handleUpdate}
									className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
								>
									{view === 'create' ? 'Create Session' : 'Update Session'}
								</button>
							</div>

							{
								successMessage &&
								(
									<p className='bg-green-600 dark:bg-green-700 text-white py-3 px-5 rounded-lg text-[15px]'>New Session Successfully created</p>
								)
							}
							{
								errorMessage &&
								(
									<p className='bg-red-600 dark:bg-red-700 text-white py-3 px-5 rounded-lg text-[15px]'>{errorMessage}</p>
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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 rounded-md p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Sessions</h1>
						<p className="text-gray-600 dark:text-gray-400">Create and manage your available session slots</p>
					</div>
					<button
						onClick={() => setView('create')}
						className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center space-x-2 shadow-md"
					>
						<Plus className="w-5 h-5" />
						<span>Create Session</span>
					</button>
				</div>

				{/* Filters and Search */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 mb-6">
					<div className="grid md:grid-cols-2 gap-4">
						<div className="relative">
							<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
							<input
								type="text"
								placeholder="Search by date, time, or type..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<div>
							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
								className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
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
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Sessions</p>
						<p className="text-3xl font-bold text-gray-900 dark:text-white">{sessions.length}</p>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Available</p>
						<p className="text-3xl font-bold text-green-600 dark:text-green-500">
							{todaySessions ? todaySessions.length : 0}
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Booked</p>
						<p className="text-3xl font-bold text-blue-600 dark:text-blue-500">
							{sessions.filter(s => s.sessionStatus === 'Booked').length}
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-1">This Week</p>
						<p className="text-3xl font-bold text-purple-600 dark:text-purple-500">
							{sessions.filter(s => new Date(s.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
						</p>
					</div>
				</div>

				{/* Sessions List */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden">
					{
						sessions.length > 0 ? 
						(
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
										<tr>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Date & Time</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Type</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Mode</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Duration</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
											<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Bookings</th>
											<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
										{filteredSessions.length > 0 ? filteredSessions.map((session) => (
											<tr key={session._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
												<td className="px-6 py-4">
													<div>
														<p className="font-semibold text-gray-900 dark:text-white">{new Date(session.date).toISOString().split("T")[0]}</p>
														<p className="text-sm text-gray-600 dark:text-gray-400">{session.startTime} - {session.endTime}</p>
													</div>
												</td>
												<td className="px-6 py-4">
													<p className="text-gray-900 dark:text-white">{session.sessionType}</p>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center space-x-2">
														{session.sessionMode === 'Virtual' && <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
														{session.sessionMode === 'In-Person' && <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />}
														{session.sessionMode === 'Phone' && <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
														<span className="text-gray-900 dark:text-white text-[15px]">{session.sessionMode}</span>
													</div>
												</td>
												<td className="px-6 py-4">
													<p className="text-gray-900 dark:text-white">{session.sessionDuration}</p>
												</td>
												<td className="px-6 py-4">
													<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
														session.sessionStatus === 'available' 
															? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
															: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
													}`}>
														{session.sessionStatus}
													</span>
												</td>
												<td className="px-6 py-4">
													<p className="text-gray-900 dark:text-white">
														{0}/{session.maxBookings}
													</p>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center justify-end space-x-2">
														<button
															onClick={() => handleView(session)}
															className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
															title="View"
														>
															<Eye className="w-5 h-5" />
														</button>
														<button
															onClick={() => handleEdit(session)}
															className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
															title="Edit"
														>
															<Edit className="w-5 h-5" />
														</button>
														<button
															onClick={() => handleDelete(session._id)}
															className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
															title="Delete"
														>
															<Trash2 className="w-5 h-5" />
														</button>
													</div>
												</td>
											</tr>
										))
										: 
										(
											<TableRowSkeleton/>
										)
										}
									</tbody>
								</table>
							</div>
						)
						: 
						(
							<div className="text-center py-12">
								<Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
								<p className="text-gray-600 dark:text-gray-400 text-lg">No sessions found</p>
								<p className="text-gray-500 dark:text-gray-500 text-sm">Try adjusting your search or filters</p>
							</div>
						)
					}
				</div>
			</div>
		</div>
  );
}