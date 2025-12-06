import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../../components/studentSideBar';
import { Heart, Home, Calendar, MessageSquare, FileText, Clock, ChevronLeft, ChevronRight, User, Bell, LogOut, Video, CheckCircle, AlertCircle, Plus, Search, Sidebar } from 'lucide-react';
import StudentSessionComponent from '../../components/studentSessionComponent';
import MessagingComponent from '../../components/studentMessageComponent';
import StudentFeedBack from '../../components/studentFeedbackComponent';
import StudentProfile from '../../components/studentProfileComponent';
import {  useNavigate } from 'react-router-dom';
export default function StudentDashboard()
{
    const navigate = useNavigate();
    // check if studentDetails Exist in DB:
    const studentId = localStorage.getItem("studentId");

    const checkStudentDetailsExist = async()=>{
        try
        {
            const response = await axios.get(`http://localhost:5000/api/studentDetails/getStudentDetails/${studentId}`);
            console.log(response.data.data);
            if (response.data.success)
            {
                if (Object.keys(response.data.data).length === 0)
                {
                    navigate("/studentdetails")
                }
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }
    useEffect(()=>{
        checkStudentDetailsExist();
    }, []);
    
    const email = localStorage.getItem("email");
    
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
    
    const [myUpcomingSessions, setUpcomingSessions] = useState([]);

    const getAllSessions = async()=>{
		try
		{
			const response = await axios.get("http://localhost:5000/api/psychiatristSession/getAllSessions");
            console.log(response)
            if (response.data.success)
            {
                setUpcomingSessions(response.data.data);
                
            }
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	}
    
    useEffect(()=>{
        getAllSessions();
    }, [])
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

  // Sample available sessions : ARRay
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

    // Sample feedbacks : ARRAY
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

    // Sample messages : ARRAY
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


    // RENDERPROFILE
    const renderOverview = 
    (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 flex flex-row justify-between items-center rounded-2xl p-8 text-white">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {email?.split("@")[0]}!</h1>
                    <p className="text-blue-100">Here's an overview of your mental health journey</p>
                </div>

                <button className="relative p-2  hover:text-gray-500 transition">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white hover:shadow-[0px_0px_10px_#18DEC8]  hover:cursor-pointer rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                    <div className="flex items-center justify-between  ">
                        <div>
                            <p className="text-gray-600 text-sm">Upcoming Sessions</p>
                            <p className="text-3xl font-bold text-gray-900">{myUpcomingSessions.length > 0 ? myUpcomingSessions.length : 0}</p>
                        </div>
                        <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white hover:shadow-[0px_0px_10px_#18DEC8]  hover:cursor-pointer rounded-xl shadow-md p-6 border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-gray-600 text-sm">Completed Sessions</p>
                        <p className="text-3xl font-bold text-gray-900">8</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white hover:shadow-[0px_0px_10px_#18DEC8]  hover:cursor-pointer rounded-xl shadow-md p-6 border-l-4 border-purple-600">
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
                
                {
                    myUpcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                        {myUpcomingSessions.map((session) => (
                            <div key={session._id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
                                <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="font-bold text-gray-900">{session.psychiatristId.psychiatristName}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        session.sessionStatus === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {session.sessionStatus}
                                    </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{session.type}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        {/* <span>{session.date}</span> */}
                                        <span>{new Date(session.date).toISOString().split("T")[0]}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{session.startTime - session.endTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Video className="w-4 h-4" />
                                        <span>{session.sessionMode}</span>
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




    
    return (
        <div className="flex flex-row h-screen dark:bg-slate-800 bg-gray-50">
            {/* studentSideBar */}
            <StudentSideBar activeView={activeView} setActiveView={setActiveView}/>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
            {/* Top Bar */}
                {/* <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="px-8 py-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            <p>I am just</p>
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
                </div> */}

            {/* Content Area */}
                <div className="p-8">
                    {activeView === "overview" && renderOverview}
                    {activeView === "sessions" && <StudentSessionComponent/>}
                    {activeView === "messages" && <MessagingComponent/>}
                    {activeView === "feedback" && <StudentFeedBack/>}
                    {activeView === "profile" && <StudentProfile/>}
                </div>
            </main>
        </div>
    );
}