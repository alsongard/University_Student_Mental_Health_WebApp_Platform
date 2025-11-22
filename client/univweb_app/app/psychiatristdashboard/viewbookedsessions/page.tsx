'use client'
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone, Search, Filter, Check, X, MessageSquare, Eye, FileText, ChevronDown } from 'lucide-react';

export default function PsychiatristBookedSessions()
{
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [selectedSession, setSelectedSession] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Sample booked sessions data
    const [bookedSessions, setBookedSessions] = useState([
        {
        id: 1,
        bookingId: 'BOOK001',
        studentName: 'John Kamau',
        studentEmail: 'john.kamau@zetech.ac.ke',
        studentAdmissionNum: 'ADM12345',
        studentAge: 21,
        sessionDate: '2025-10-28',
        sessionTime: '10:00 AM',
        sessionType: 'Individual Therapy',
        mode: 'In-Person',
        status: 'confirmed',
        reason: 'Anxiety management and stress relief',
        notes: 'Student mentioned sleep issues in booking form',
        createdAt: '2025-10-15',
        attendance: null
        },
        {
        id: 2,
        bookingId: 'BOOK002',
        studentName: 'Sarah Omondi',
        studentEmail: 'sarah.omondi@zetech.ac.ke',
        studentAdmissionNum: 'ADM12346',
        studentAge: 20,
        sessionDate: '2025-10-28',
        sessionTime: '2:00 PM',
        sessionType: 'Individual Therapy',
        mode: 'Virtual',
        status: 'confirmed',
        reason: 'Relationship issues with roommate',
        notes: 'Prefers virtual sessions due to schedule',
        createdAt: '2025-10-14',
        attendance: null
        },
        {
        id: 3,
        bookingId: 'BOOK003',
        studentName: 'Michael Kipchoge',
        studentEmail: 'michael.kipchoge@zetech.ac.ke',
        studentAdmissionNum: 'ADM12347',
        studentAge: 22,
        sessionDate: '2025-10-29',
        sessionTime: '9:00 AM',
        sessionType: 'Follow-up Session',
        mode: 'In-Person',
        status: 'confirmed',
        reason: 'Follow-up on previous ADHD discussion',
        notes: 'Second session this month',
        createdAt: '2025-10-10',
        attendance: 'present'
        },
        {
        id: 4,
        bookingId: 'BOOK004',
        studentName: 'Grace Mwangi',
        studentEmail: 'grace.mwangi@zetech.ac.ke',
        studentAdmissionNum: 'ADM12348',
        studentAge: 19,
        sessionDate: '2025-10-30',
        sessionTime: '11:00 AM',
        sessionType: 'Initial Consultation',
        mode: 'Phone',
        status: 'pending',
        reason: 'First time seeking mental health support',
        notes: 'New student, first appointment',
        createdAt: '2025-10-22',
        attendance: null
        },
        {
        id: 5,
        bookingId: 'BOOK005',
        studentName: 'David Njoroge',
        studentEmail: 'david.njoroge@zetech.ac.ke',
        studentAdmissionNum: 'ADM12349',
        studentAge: 23,
        sessionDate: '2025-10-25',
        sessionTime: '3:00 PM',
        sessionType: 'Individual Therapy',
        mode: 'Virtual',
        status: 'completed',
        reason: 'Depression and low motivation',
        notes: 'Student showed good progress',
        createdAt: '2025-10-05',
        attendance: 'present'
        }
    ]);

    const handleConfirmSession = (sessionId) => {
        setBookedSessions(bookedSessions.map(session =>
        session.id === sessionId ? { ...session, status: 'confirmed' } : session
        ));
    };

    const handleCancelSession = (sessionId) => {
        setBookedSessions(bookedSessions.map(session =>
        session.id === sessionId ? { ...session, status: 'cancelled' } : session
        ));
    };

    const handleMarkAttendance = (sessionId, attendance) => {
        setBookedSessions(bookedSessions.map(session =>
        session.id === sessionId ? { ...session, attendance, status: 'completed' } : session
        ));
    };

    const handleViewDetails = (session) => {
        setSelectedSession(session);
        setShowDetailModal(true);
    };

    const filteredSessions = bookedSessions.filter(session => {
        const matchesSearch = 
        session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.studentAdmissionNum.includes(searchQuery) ||
        session.bookingId.includes(searchQuery);
        
        const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
        
        const sessionDate = new Date(session.sessionDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let matchesDate = true;
        if (filterDate === 'today') {
        matchesDate = sessionDate.toDateString() === today.toDateString();
        } else if (filterDate === 'upcoming') {
        matchesDate = sessionDate >= today;
        } else if (filterDate === 'past') {
        matchesDate = sessionDate < today;
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status) {
        case 'confirmed':
            return 'bg-green-100 text-green-700';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700';
        case 'completed':
            return 'bg-blue-100 text-blue-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
        }
    };

    const getModeIcon = (mode) => {
        switch (mode) {
        case 'Virtual':
            return <Video className="w-4 h-4" />;
        case 'In-Person':
            return <MapPin className="w-4 h-4" />;
        case 'Phone':
            return <Phone className="w-4 h-4" />;
        default:
            return null;
        }
    };

    const getAttendanceColor = (attendance) => {
        if (attendance === 'present') return 'bg-green-50 text-green-700 border-green-200';
        if (attendance === 'absent') return 'bg-red-50 text-red-700 border-red-200';
        return 'bg-gray-50 text-gray-700 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booked Sessions</h1>
            <p className="text-gray-600">View and manage all student session bookings</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{bookedSessions.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                {bookedSessions.filter(s => s.status === 'confirmed').length}
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                {bookedSessions.filter(s => s.status === 'pending').length}
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-blue-600">
                {bookedSessions.filter(s => s.status === 'completed').length}
                </p>
            </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name, email, or admission number..."
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
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                </div>
                <div>
                <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
            {filteredSessions.length > 0 ? (
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Session Details</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Attendance</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredSessions.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                            <div>
                            <p className="font-semibold text-gray-900">{session.studentName}</p>
                            <p className="text-sm text-gray-600">{session.studentEmail}</p>
                            <p className="text-xs text-gray-500">{session.studentAdmissionNum}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-gray-900">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{session.sessionDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-900">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{session.sessionTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {getModeIcon(session.mode)}
                                <span className="text-sm text-gray-600">{session.mode}</span>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div>
                            <p className="text-sm font-medium text-gray-900">{session.sessionType}</p>
                            <p className="text-xs text-gray-500">Booking: {session.bookingId}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                            {session.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            {session.status === 'completed' && session.attendance ? (
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAttendanceColor(session.attendance)}`}>
                                {session.attendance === 'present' ? '✓ Present' : '✗ Absent'}
                            </div>
                            ) : session.status === 'completed' ? (
                            <span className="text-xs text-gray-500">-</span>
                            ) : (
                            <div className="flex items-center space-x-2">
                                <button
                                onClick={() => handleMarkAttendance(session.id, 'present')}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                                title="Mark Present"
                                >
                                <Check className="w-4 h-4" />
                                </button>
                                <button
                                onClick={() => handleMarkAttendance(session.id, 'absent')}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                                title="Mark Absent"
                                >
                                <X className="w-4 h-4" />
                                </button>
                            </div>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-end space-x-2">
                            <button
                                onClick={() => handleViewDetails(session)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="View Details"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            {session.status === 'pending' && (
                                <>
                                <button
                                    onClick={() => handleConfirmSession(session.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                    title="Confirm"
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleCancelSession(session.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Cancel"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                </>
                            )}
                            <button
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                title="Send Message"
                            >
                                <MessageSquare className="w-5 h-5" />
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
                <p className="text-gray-600 text-lg">No booked sessions found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                </div>
            )}
            </div>
        </div>

        {/* Details Modal */}
        {showDetailModal && selectedSession && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
                <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>
                </div>

                <div className="space-y-6">
                {/* Student Information */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Student Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Name</p>
                        <p className="font-semibold text-gray-900">{selectedSession.studentName}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Age</p>
                        <p className="font-semibold text-gray-900">{selectedSession.studentAge} years</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold text-gray-900 truncate">{selectedSession.studentEmail}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Admission Number</p>
                        <p className="font-semibold text-gray-900">{selectedSession.studentAdmissionNum}</p>
                    </div>
                    </div>
                </div>

                {/* Session Information */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Session Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="font-semibold text-gray-900">{selectedSession.sessionDate}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Time</p>
                        <p className="font-semibold text-gray-900">{selectedSession.sessionTime}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Type</p>
                        <p className="font-semibold text-gray-900">{selectedSession.sessionType}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Mode</p>
                        <p className="font-semibold text-gray-900">{selectedSession.mode}</p>
                    </div>
                    </div>
                </div>

                {/* Reason and Notes */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Student Feedback</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 mb-1">Reason for Session</p>
                    <p className="text-gray-900">{selectedSession.reason}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Additional Notes</p>
                    <p className="text-gray-900">{selectedSession.notes}</p>
                    </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                    <button
                    onClick={() => setShowDetailModal(false)}
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