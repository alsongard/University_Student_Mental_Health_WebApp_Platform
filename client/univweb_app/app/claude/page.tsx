'use client'
import React, { useState } from 'react';
import { Heart, Home, Calendar, MessageSquare, FileText, Clock, ChevronLeft, ChevronRight, User, Bell, LogOut, Video, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';

export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [selectedSession, setSelectedSession] = useState(null);

  // Sample student data
  const studentData = {
    name: "John Kamau",
    admissionNumber: "ADM12345",
    email: "john.kamau@zetech.ac.ke",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  };

  // Sample upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      psychiatristName: "Dr. Sarah Mwangi",
      date: "2025-10-28",
      time: "10:00 AM",
      type: "Individual Therapy",
      status: "confirmed",
      mode: "In-Person"
    },
    {
      id: 2,
      psychiatristName: "Dr. James Ochieng",
      date: "2025-11-02",
      time: "2:00 PM",
      type: "Follow-up Session",
      status: "pending",
      mode: "Virtual"
    }
  ];

  // Sample available sessions
  const availableSessions = [
    {
      id: 101,
      psychiatristName: "Dr. Sarah Mwangi",
      specialization: "Anxiety & Depression",
      availableSlots: ["2025-10-30 9:00 AM", "2025-10-30 11:00 AM", "2025-10-31 2:00 PM"],
      mode: "Both"
    },
    {
      id: 102,
      psychiatristName: "Dr. Amina Hassan",
      specialization: "Relationship Issues",
      availableSlots: ["2025-10-29 10:00 AM", "2025-10-30 3:00 PM"],
      mode: "In-Person"
    },
    {
      id: 103,
      psychiatristName: "Dr. Peter Kamau",
      specialization: "ADHD & Learning Support",
      availableSlots: ["2025-10-31 9:00 AM", "2025-11-01 1:00 PM"],
      mode: "Virtual"
    }
  ];

  // Sample calendar events
  const calendarEvents = [
    { date: "2025-10-28", title: "Therapy Session", type: "session" },
    { date: "2025-10-30", title: "Group Therapy", type: "group" },
    { date: "2025-11-02", title: "Follow-up", type: "session" }
  ];

  // Sample feedbacks
  const feedbacks = [
    {
      id: 1,
      sessionDate: "2025-10-15",
      psychiatristName: "Dr. Sarah Mwangi",
      rating: 5,
      comment: "Very helpful session. Dr. Mwangi was understanding and provided practical strategies.",
      response: "Thank you for your feedback! I'm glad our session was beneficial."
    },
    {
      id: 2,
      sessionDate: "2025-10-10",
      psychiatristName: "Dr. James Ochieng",
      rating: 4,
      comment: "Good session, but I wish we had more time to discuss everything.",
      response: null
    }
  ];

  // Sample messages
  const messages = [
    {
      id: 1,
      from: "Dr. Sarah Mwangi",
      preview: "Hi John, just checking in to see how you're doing with the...",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "MindBridge Support",
      preview: "Your appointment for October 28th has been confirmed.",
      timestamp: "1 day ago",
      unread: false
    }
  ];

  const navigationItems = [
    { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Overview' },
    { id: 'sessions', icon: <Calendar className="w-5 h-5" />, label: 'View Sessions' },
    { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
    { id: 'feedback', icon: <FileText className="w-5 h-5" />, label: 'Feedback' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name.split(' ')[0]}!</h1>
        <p className="text-blue-100">Here's an overview of your mental health journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Upcoming Sessions</p>
              <p className="text-3xl font-bold text-gray-900">{upcomingSessions.length}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Sessions</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Unread Messages</p>
              <p className="text-3xl font-bold text-gray-900">{messages.filter(m => m.unread).length}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
          <button
            onClick={() => setActiveView('sessions')}
            className="text-blue-600 font-semibold hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900">{session.psychiatristName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        session.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{session.type}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>{session.mode}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No upcoming sessions scheduled</p>
            <button
              onClick={() => setActiveView('sessions')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Book a Session
            </button>
          </div>
        )}
      </div>

      {/* Calendar & Activities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mini Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar</h2>
          <div className="space-y-2">
            {calendarEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
            <button
              onClick={() => setActiveView('messages')}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 3).map((message) => (
              <div key={message.id} className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${message.unread ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-gray-900">{message.from}</p>
                  {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                </div>
                <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Available Sessions</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search psychiatrists..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {availableSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{session.psychiatristName}</h3>
                <p className="text-blue-600 font-semibold">{session.specialization}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Available
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Available Time Slots:</p>
              <div className="space-y-2">
                {session.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSession({ ...session, selectedSlot: slot })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-sm font-medium text-gray-700"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Mode: {session.mode}</span>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Booking</h2>
            <div className="space-y-3 mb-6">
              <p><strong>Psychiatrist:</strong> {selectedSession.psychiatristName}</p>
              <p><strong>Time Slot:</strong> {selectedSession.selectedSlot}</p>
              <p><strong>Mode:</strong> {selectedSession.mode}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedSession(null)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Session booked successfully!');
                  setSelectedSession(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
      
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className={`p-6 hover:bg-gray-50 cursor-pointer transition ${message.unread ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {message.unread && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                  <h3 className="font-bold text-gray-900">{message.from}</h3>
                </div>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-gray-600">{message.preview}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Session Feedback</h1>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          New Feedback
        </button>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{feedback.psychiatristName}</h3>
                <p className="text-sm text-gray-600">Session Date: {feedback.sessionDate}</p>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <p className="text-gray-700">{feedback.comment}</p>
            </div>

            {feedback.response && (
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-sm font-semibold text-gray-900 mb-1">Psychiatrist Response:</p>
                <p className="text-gray-700">{feedback.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={studentData.avatar}
            alt={studentData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
            <p className="text-gray-600">{studentData.admissionNumber}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
              Change Photo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={studentData.name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={studentData.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Admission Number</label>
            <input
              type="text"
              value={studentData.admissionNumber}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="pt-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } flex flex-col`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-blue-500">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8" />
              <span className="text-xl font-bold">MindBridge</span>
            </div>
          )}
          {sidebarCollapsed && <Heart className="w-8 h-8 mx-auto" />}
          
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeView === item.id
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:bg-blue-500'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              {item.icon}
              {!sidebarCollapsed && <span className="font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-blue-500">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!sidebarCollapsed && <span className="font-semibold">Collapse</span>}
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-blue-500">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}>
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {navigationItems.find(item => item.id === activeView)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                />
                {!sidebarCollapsed && (
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{studentData.name}</p>
                    <p className="text-xs text-gray-600">{studentData.admissionNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeView === 'overview' && renderOverview()}
          {activeView === 'sessions' && renderSessions()}
          {activeView === 'messages' && renderMessages()}
          {activeView === 'feedback' && renderFeedback()}
          {activeView === 'profile' && renderProfile()}
        </div>
      </main>
    </div>
  );
}