import React, { useState, useEffect } from 'react';
import { Heart, Home, Calendar, MessageSquare, FileText, LogOut, User, Clock, CheckSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import PsychiatristSidebar from '../../components/psychiatristSideBar';
import PsychiatristBookedSessions from '../../components/pyschiatristBookSessionComponent';
import PsychiatristSessionsManagement from '../../components/pyschiatristSessionComponent';
import PsychiatristFeedback from '../../components/psychiatristFeedbackComponent';
import PsychiatristProfile from '../../components/psychiatristProfileComponent';
import axios from 'axios';



export default function PsychiatristDashboard()
{
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [activeView, setActiveView] = useState('overview');
	const [userDetails, setUserDetials] = useState(null);
	// Sample psychiatrist data

	const [myBookedSessions, setmyBookedSessions] = useState([]);
	// get Booked Sessions For Given Psychiatrist :: /id
	const GetMyPschBookedSessions = async ()=>{
		try
		{
			const response = await axios.get("http://localhost:5000/api/bookSession/psychiatristViewBooked/692bbcb9946ace680fc7e177");
			if (response.data.success)
			{
				setmyBookedSessions(response.data.data);
				// console.log(response.data.data);
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	};

	useEffect(()=>{
		GetMyPschBookedSessions();
	}, [])

	let myTodaySessions = [];
	if (myBookedSessions)
	{

		myTodaySessions = myBookedSessions.length > 0 &&  myBookedSessions.filter((sessionBooked)=>{
			const today = new Date();
			const sessionDate = new Date(sessionBooked.sessionId.date)
			if (sessionDate == today)
			{
				return sessionBooked
			}
		});
		console.log('myTodaySessions');
		console.log(myTodaySessions);
	}


	// const userDetails = local
	const renderOverView = ()=>{
		return (
			<div className="space-y-6 ">
				<div className="bg-gradient-to-r from-blue-600 dark:from-slate-600 to-blue-700 dark:to-slate-700 rounded-2xl p-8 text-white">
					<h1 className="text-3xl font-bold dark:text-white mb-2">Welcome back Doctor {userDetails ? userDetails.split(" ")[0] : "..."}</h1>
					<p className="text-blue-100 dark:text-white">Here's your schedule for today</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					<div className="bg-white dark:bg-slate-500 rounded-xl shadow-md p-6 border-l-4 dark:border-white border-blue-600">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 text-sm dark:text-white">Today's Sessions</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{myTodaySessions.length > 0 ? myTodaySessions.length : 0 } </p>
							</div>
							<Calendar className="w-12 h-12 dark:text-white text-blue-600 opacity-20" />
						</div>
					</div>

					<div className="bg-white dark:bg-slate-500 rounded-xl shadow-md p-6 border-l-4 dark:border-white border-green-600">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 dark:text-white text-sm">Total Patients</p>
								<p className="text-3xl dark:text-white font-bold text-gray-900">{myTodaySessions.length > 0 ? myTodaySessions.length : 0 }</p>
							</div>
							<User className="w-12 h-12 dark:text-white text-green-600 opacity-20" />
						</div>
					</div>
					<div className="bg-white rounded-xl n dark:bg-slate-500 shadow-md p-6 border-l-4 dark:border-white border-purple-600">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 text-sm dark:text-white">Pending Feedback</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
							</div>
							<MessageSquare className="w-12 h-12 dark:text-white text-purple-600 opacity-20" />
						</div>
					</div>
				</div>

				<div className="bg-white  dark:bg-slate-500 rounded-2xl shadow-md p-6">
					<h2 className="text-2xl font-bold  text-gray-900 dark:text-white mb-6">Today's Schedule</h2>
					<div className="space-y-4">

						{myTodaySessions.map((session) => (
						<div key={session._id} className="border-2 border-gray-200  rounded-xl p-4 hover:border-blue-600 dark:hover:border-black transition">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
										<User className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<h3 className="font-bold dark:text-white text-gray-900">{session.studentId.email}</h3>
										<p className="text-sm dark:text-white text-gray-600">{session.sessionId.sessionType}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="font-semibold dark:text-white text-gray-900">10:00 AM</p>
									<p className="text-sm dark:text-white text-gray-600">{session.sessionId.sessionMode}</p>
								</div>
							</div>
						</div>
						))}
					</div>
				</div>
			</div>
		)
	}


	return (
		<div className="flex h-screen dark:bg-gray-800 bg-gray-50">
			<PsychiatristSidebar activeView={activeView} setActiveView={setActiveView}  setUserDetials={setUserDetials}/>
			{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				{/* Top Bar */}

				{/* Content Area */}
				<div className="p-8">
					{activeView === "overview" && renderOverView()}
					{activeView === "sessions" && <PsychiatristSessionsManagement/>}
					{activeView === "booked-sessions" && <PsychiatristBookedSessions/>}
					{activeView === "feedback" && <PsychiatristFeedback/>}
					{activeView === "messages" && <div><h1>Messages Component Coming Soon...</h1></div>}
					{activeView === "profile" && <PsychiatristProfile/>}
				</div>
			</main>
		</div>
	);
}