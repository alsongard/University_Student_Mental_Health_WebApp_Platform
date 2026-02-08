import React, { useState, useCallback, useEffect } from 'react';
import { Heart, Home, Calendar, MessageSquare, FileText, LogOut, User, Clock, CheckSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import PsychiatristSidebar from '../../components/psychiatristSideBar';
import PsychiatristBookedSessions from '../../components/pyschiatristBookSessionComponent';
import PsychiatristSessionsManagement from '../../components/pyschiatristSessionComponent';
import PsychiatristFeedback from '../../components/psychiatristFeedbackComponent';
import PsychiatristProfile from '../../components/psychiatristProfileComponent';
import axios from 'axios';
import MessagingComponent from '../../components/messageComponent';
import { useSelector } from 'react-redux';


export default function PsychiatristDashboard()
{
	const apiURL = import.meta.env.VITE_API_URL;	
	const email = useSelector((state)=>{return state.myAuthSlicer.email});
	const role = useSelector((state)=>{return state.myAuthSlicer.role});
	// console.log('PsychiatristDashboard Email from Redux Store: ', email); // TESTING:WORKING
	// console.log('PsychiatristDashboard Role from Redux Store: ', role); // TESTING:WORKING


	const [refreshFlag, setRefreshFlag] = useState({
		overview:0,
		sessions:0,
		bookedSessions: 0,
		feedback:0,
		messages:0,
		profile:0
	});
	const [activeView, setActiveView] = useState('overview');
	const [userDetails, setUserDetials] = useState(null);
	// Sample psychiatrist data

	const [myBookedSessions, setmyBookedSessions] = useState([]);
	// get Booked Sessions For Given Psychiatrist :: /id
	const GetMyPschBookedSessions = useCallback(async ()=>{
		try
		{
			// https://university-student-psychiatrist.onrender.com/
			// const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/bookSession/psychiatristViewBooked`, {withCredentials:true});
			const response = await axios.get(`${apiURL}/api/bookSession/psychiatristViewBooked`, {withCredentials:true});
			if (response.data.success)
			{
				setmyBookedSessions(response.data.data);
				// setTimeout(() => {
				// 	// console.log('Booked Sessions for Psychiatrist: ');
				// 	// console.log(myBookedSessions);
				// }, 1000);
				// console.log('Booked Sessions for Psychiatrist: ');
				// console.log(response.data.data);
			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	}, []);

	useEffect(()=>{
		GetMyPschBookedSessions();
	}, [refreshFlag.overview])

	let myTodaySessions = [];
	let numberFlag:Number = 0;
	if (myBookedSessions.length > 0)
	{

		myTodaySessions = myBookedSessions.length > 0 &&  myBookedSessions.filter((sessionBooked)=>{
			const today = new Date();

			const sessionDate = new Date(sessionBooked.sessionId.date)
			if (sessionDate == today)
			{
				return sessionBooked
			}
		});
		// console.log('myTodaySessions');
		// console.log(myTodaySessions);
		numberFlag = myBookedSessions.length;
	}


	// setInterval(() => {
	// 	console.log('myBookedSessions length: ', myBookedSessions.length);
	// 	console.log(myBookedSessions)
	// }, 10000)


	// const userDetails = local
	const renderOverView = ()=>{
		return (
			<div className="space-y-6 p-5">
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white">
					<h1 className="text-3xl font-bold mb-2">Welcome back {userDetails ? userDetails : "..."}</h1>
					<p className="text-blue-100 dark:text-gray-300">Here's your schedule for today</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 border-l-4 border-blue-600 dark:border-blue-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 dark:text-gray-400 text-sm">Today's Sessions</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{myTodaySessions.length > 0 ? myTodaySessions.length : 0}</p>
							</div>
							<Calendar className="w-12 h-12 text-blue-600 dark:text-blue-500 opacity-20 dark:opacity-30" />
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 border-l-4 border-green-600 dark:border-green-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 dark:text-gray-400 text-sm">Total Patients</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{myTodaySessions.length > 0 ? myTodaySessions.length : 0}</p>
							</div>
							<User className="w-12 h-12 text-green-600 dark:text-green-500 opacity-20 dark:opacity-30" />
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 border-l-4 border-purple-600 dark:border-purple-500">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 dark:text-gray-400 text-sm">Pending Feedback</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
							</div>
							<MessageSquare className="w-12 h-12 text-purple-600 dark:text-purple-500 opacity-20 dark:opacity-30" />
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Today's Schedule</h2>
					<div className="space-y-4">
						{myTodaySessions.length > 0 ?
						 	myTodaySessions.map((session) => (
							<div key={session._id} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-600 dark:hover:border-blue-500 transition">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
											<User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-bold text-gray-900 dark:text-white">{session.studentId.email}</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">{session.sessionId.sessionType}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-semibold text-gray-900 dark:text-white">10:00 AM</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">{session.sessionId.sessionMode}</p>
									</div>
								</div>
							</div>
						))
						:
						(
							// {/* Show 3-5 skeleton session cards while loading */}
							[1].map((index) => (
								<div key={index} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 transition">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											{/* Avatar skeleton */}
											<div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
											
											{/* Text content skeleton */}
											<div className="space-y-2">
												<div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
												<div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
											</div>
										</div>
										
										{/* Time info skeleton */}
										<div className="text-right space-y-2">
											<div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div>
											<div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div>
										</div>
									</div>
								</div>
							))
						)
					}
					</div>
				</div>
			</div>
		)
	}


	return (
		<div className="flex h-screen dark:bg-gray-900 bg-gray-50">
			<PsychiatristSidebar activeView={activeView} setActiveView={setActiveView} setRefreshFlag={setRefreshFlag}  myNumber={numberFlag} setUserDetials={setUserDetials}/>
			{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				{/* Top Bar */}

				{/* Content Area */}
				{/* <div className="p-8"> */}
                <div className={`${activeView != "messages" && 'p-0'}`}>
					{activeView === "overview" && renderOverView()}
					{activeView === "sessions" && <PsychiatristSessionsManagement refreshView={refreshFlag}/>}
					{activeView === "bookedSessions" && <PsychiatristBookedSessions refreshView={refreshFlag}/>}
					{activeView === "feedback" && <PsychiatristFeedback refreshView={refreshFlag}/>}
					{activeView === "messages" && <MessagingComponent refreshView={refreshFlag}/>}
					{activeView === "profile" && <PsychiatristProfile refreshView={refreshFlag}/>}
				</div>
			</main>
		</div>
	);
}