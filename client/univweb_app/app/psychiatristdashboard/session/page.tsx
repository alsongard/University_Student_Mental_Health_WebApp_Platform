'use client';
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, X, Calendar, Clock, Video, MapPin, User, Search } from 'lucide-react';

export default function PsychiatristSessionsManagement() {
	const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'view'
	const [sessions, setSessions] = useState([
		{
			id: 1,
			date: '2025-10-28',
			time: '10:00 AM',
			duration: 50,
			type: 'Individual Therapy',
			mode: 'In-Person',
			status: 'available',
			maxBookings: 1,
			currentBookings: 0
		},
		{
			id: 2,
			date: '2025-10-28',
			time: '2:00 PM',
			duration: 50,
			type: 'Individual Therapy',
			mode: 'Virtual',
			status: 'available',
			maxBookings: 1,
			currentBookings: 0
		},
		{
			id: 3,
			date: '2025-10-29',
			time: '9:00 AM',
			duration: 50,
			type: 'Individual Therapy',
			mode: 'In-Person',
			status: 'booked',
			maxBookings: 1,
			currentBookings: 1
		},
		{
			id: 4,
			date: '2025-10-30',
			time: '11:00 AM',
			duration: 30,
			type: 'Follow-up Session',
			mode: 'Phone',
			status: 'available',
			maxBookings: 1,
			currentBookings: 0
		}
	]);
  
	const [selectedSession, setSelectedSession] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	
	const [formData, setFormData] = useState({
		date: '',
		time: '',
		duration: 50,
		type: 'Individual Therapy',
		mode: 'In-Person',
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

	const handleCreate = (e) => {
		e.preventDefault();
		const newSession = {
		id: sessions.length + 1,
		...formData,
		status: 'available',
		currentBookings: 0
		};
		setSessions([...sessions, newSession]);
		setView('list');
		resetForm();
	};

	const handleEdit = (session) => {
		setSelectedSession(session);
		setFormData({
		date: session.date,
		time: session.time,
		duration: session.duration,
		type: session.type,
		mode: session.mode,
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

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this session?')) {
		setSessions(sessions.filter(s => s.id !== id));
		}
	};

	const handleView = (session) => {
		setSelectedSession(session);
		setView('view');
	};

	const resetForm = () => {
		setFormData({
		date: '',
		time: '',
		duration: 50,
		type: 'Individual Therapy',
		mode: 'In-Person',
		maxBookings: 1
		});
		setSelectedSession(null);
	};

	const filteredSessions = sessions.filter(session => {
		const matchesSearch = 
		session.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
		session.date.includes(searchQuery) ||
		session.time.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesFilter = 
		filterStatus === 'all' || session.status === filterStatus;
    
		return matchesSearch && matchesFilter;
	});

	// View Session Details
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
					<p className="font-bold text-gray-900 text-lg">{selectedSession.date}</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4">
					<div className="flex items-center space-x-3 mb-2">
						<Clock className="w-5 h-5 text-blue-600" />
						<p className="text-sm text-gray-600">Time</p>
					</div>
					<p className="font-bold text-gray-900 text-lg">{selectedSession.time}</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4">
					<div className="flex items-center space-x-3 mb-2">
						<User className="w-5 h-5 text-blue-600" />
						<p className="text-sm text-gray-600">Session Type</p>
					</div>
					<p className="font-bold text-gray-900">{selectedSession.type}</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4">
					<div className="flex items-center space-x-3 mb-2">
						<Video className="w-5 h-5 text-blue-600" />
						<p className="text-sm text-gray-600">Mode</p>
					</div>
					<p className="font-bold text-gray-900">{selectedSession.mode}</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4">
					<p className="text-sm text-gray-600 mb-2">Duration</p>
					<p className="font-bold text-gray-900">{selectedSession.duration} minutes</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4">
					<p className="text-sm text-gray-600 mb-2">Status</p>
					<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
						selectedSession.status === 'available' 
						? 'bg-green-100 text-green-700' 
						: 'bg-blue-100 text-blue-700'
					}`}>
						{selectedSession.status}
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
					onClick={() => handleEdit(selectedSession)}
					className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
					>
					Edit Session
					</button>
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

	// Create/Edit Form
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
						Time *
					</label>
					<input
						type="time"
						name="time"
						value={formData.time}
						onChange={handleChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					/>
					</div>

					<div>
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						Duration (minutes) *
					</label>
					<select
						name="duration"
						value={formData.duration}
						onChange={handleChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					>
						<option value={30}>30 minutes</option>
						<option value={50}>50 minutes</option>
						<option value={60}>60 minutes</option>
						<option value={90}>90 minutes</option>
					</select>
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
						{sessions.filter(s => s.status === 'available').length}
						</p>
					</div>
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">Booked</p>
						<p className="text-3xl font-bold text-blue-600">
						{sessions.filter(s => s.status === 'booked').length}
						</p>
					</div>
					<div className="bg-white rounded-xl shadow-md p-6">
						<p className="text-gray-600 text-sm mb-1">This Week</p>
						<p className="text-3xl font-bold text-purple-600">
						{sessions.filter(s => new Date(s.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
						</p>
					</div>
				</div>

				{/* Sessions List */}
				<div className="bg-white rounded-xl shadow-md overflow-hidden">
				{filteredSessions.length > 0 ? (
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
							<tr key={session.id} className="hover:bg-gray-50 transition">
							<td className="px-6 py-4">
								<div>
								<p className="font-semibold text-gray-900">{session.date}</p>
								<p className="text-sm text-gray-600">{session.time}</p>
								</div>
							</td>
							<td className="px-6 py-4">
								<p className="text-gray-900">{session.type}</p>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center space-x-2">
								{session.mode === 'Virtual' && <Video className="w-4 h-4 text-blue-600" />}
								{session.mode === 'In-Person' && <MapPin className="w-4 h-4 text-green-600" />}
								{session.mode === 'Phone' && <User className="w-4 h-4 text-purple-600" />}
								<span className="text-gray-900">{session.mode}</span>
								</div>
							</td>
							<td className="px-6 py-4">
								<p className="text-gray-900">{session.duration} min</p>
							</td>
							<td className="px-6 py-4">
								<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
								session.status === 'available' 
									? 'bg-green-100 text-green-700' 
									: 'bg-blue-100 text-blue-700'
								}`}>
								{session.status}
								</span>
							</td>
							<td className="px-6 py-4">
								<p className="text-gray-900">
								{session.currentBookings}/{session.maxBookings}
								</p>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center justify-end space-x-2">
								<button
									onClick={() => handleView(session)}
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
									onClick={() => handleDelete(session.id)}
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
				) : (
					<div className="text-center py-12">
					<Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
					<p className="text-gray-600 text-lg">No sessions found</p>
					<p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
					</div>
				)}
				</div>
			</div>
		</div>
  );
}