import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../../components/studentSideBar';
import { Heart, Home, Calendar, MessageSquare, FileText, Clock, ChevronLeft, ChevronRight, User, Bell, LogOut, Video, CheckCircle, AlertCircle, Plus, Search, Sidebar, Loader } from 'lucide-react';
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
            // const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/studentDetails/getStudentDetails/${studentId}`);
            const response = await axios.get(`http://localhost:5000/api/studentDetails/getStudentDetails/`, 
                {withCredentials:true}
            );
            // console.log('checkStudentDetailsExist response.data');
            // console.log(response.data);
            // console.log('response');
            // console.log(response);
            if (!response.data.success)
            {
                // Means no student details found
                navigate("/studentdetails");
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
            console.log('response.data.data')
            console.log(err.response.data.data);

            console.log('response.status')
            console.log(err.response.status);
            if (!err.response.data.success)
            {
                if (err.response.status === 400)
                {
                    
                    navigate("/studentdetails");
                }
            }
        }
    }


    const email = localStorage.getItem("email");
    
    const [activeView, setActiveView] = useState('overview');
    
    
    const [allSessions, setAllSessions] = useState([]);

    const getAllSessions = async()=>{
		try
		{
			// const response = await axios.get("https://university-student-psychiatrist.onrender.com/api/psychiatristSession/getAllSessions",
            const response = await axios.get("http://localhost:5000/api/psychiatristSession/getAllSessions",
                {withCredentials:true}
            );
            // console.log(response)
            if (response.data.success)
            {
                setAllSessions(response.data.data);     
            }
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	};

    const [studentBookedSessions, setStudentBookedSessions] = useState([]);
    const GetStudentBookedSessions = async ()=>{
        try
        {
            // const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/bookSession/getStudentBookedSessions/`, {withCredentials:true});
            const response = await axios.get(`http://localhost:5000/api/bookSession/getStudentBookedSessions/`, {withCredentials:true});
            if (response.data.success)
            {
                if (response.data.msg === "You have no booked sessions")
                {
                    setStudentBookedSessions([]);
                    return;
                }
                setStudentBookedSessions(response.data.data);
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`)
        }
    }
    useEffect(()=>{

        checkStudentDetailsExist();
        GetStudentBookedSessions();
        setTimeout(()=>{
            getAllSessions();   
        }, 60000);


        setTimeout(()=>
            {
                const calenderSessions = studentBookedSessions.length > 0 && studentBookedSessions.filter((studentSession)=>
                {
                    const theDate = new Date(studentSession.sessionId.date.split("T")[0]);
                    // console.log('theDate');
                    // console.log(theDate);
                    const today = new Date()
                    if (theDate > today)
                    {
                        return studentSession
                    }
                    }).map((studentSession)=>{
                            return { sessionDate: studentSession.sessionId.date, sessionType: studentSession.sessionId.sessionType }
                    });

                    // console.log("calenderSessions");
                    // console.log(calenderSessions);
            }, 8000);
        
        }, [8000]
    );




  // Sample calendar events
    const calendarEvents = [
        { date: "2025-10-28", title: "Therapy Session", type: "session" },
        { date: "2025-10-30", title: "Group Therapy", type: "group" },
        { date: "2025-11-02", title: "Follow-up", type: "session" }
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

    // check sessions
    const newUpComingSessions = allSessions.filter((sessions)=>{
        const theDate = new Date(sessions.date.split("T")[0]);
        const today = new Date()
        if (theDate > today)
        {
            return sessions
        }
    })




    const newSessions = allSessions.filter((sessions)=>{
        const theDate = new Date(sessions.date.split("T")[0]);
        const today = new Date()
        if (theDate >= today)
        {
            return sessions
        }
    })


    const calenderSessions = studentBookedSessions.length > 0 && studentBookedSessions.filter((studentSession)=>{
        const theDate = new Date(studentSession.sessionId.date.split("T")[0]);
        // console.log('theDate');
        // console.log(theDate);
        const today = new Date()
        if (theDate > today)
        {
            return studentSession
        }
        }).map((studentSession)=>{
                return { sessionDate: studentSession.sessionId.date, sessionType: studentSession.sessionId.sessionType }
        });

        // console.log("calenderSessions");
        // console.log(calenderSessions);

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
                            {/* <p className="text-3xl font-bold text-gray-900">{allSessions.length > 0 ? allSessions.length : 0}</p> */}
                            <p className="text-3xl font-bold text-gray-900">{newUpComingSessions.length}</p>
                        </div>
                        <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
                    </div>
                </div>

                <div className="bg-white hover:shadow-[0px_0px_10px_#18DEC8]  hover:cursor-pointer rounded-xl shadow-md p-6 border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-gray-600 text-sm">Completed Sessions</p>
                        <p className="text-3xl font-bold text-gray-900">{studentBookedSessions.length}</p>
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
                    allSessions.length > 0 ? (
                    <div className="space-y-4">
                        {
                            newSessions.map((session) => (

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
                                        <span>{session.startTime}</span>
                                        &#x2192;
                                        <span>{ session.endTime}</span>
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
                            {
                                calenderSessions.length > 0 && 
                                ( 
                                    calenderSessions.map((event, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            <div className="flex-1">
                                            <p className="font-semibold text-gray-900">{event.sessionType}</p>
                                            <p className="text-sm text-gray-600">{new Date(event.sessionDate).toISOString().split("T")[0]}</p>
                                            </div>
                                        </div>
                                        )
                                    )
                                )
                            }
                            {
                                calenderSessions.length < 0 && 
                                (
                                    <div>
                                        <Loader/>
                                    </div>
                                )
                            }
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
           
            {/* Content Area */}
                <div className={`${activeView != "messages" && 'p-8'}`}>
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