import React, { useState, useEffect } from 'react';
import { Heart, Home, Calendar, RefreshCw, MessageSquare, FileText, LogOut, User, Clock, CheckSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {isLoggedOut} from "../features/auth/authSlicer"
import { useNavigate } from 'react-router-dom';
function PsychiatristSidebar(props:any) 
{
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {activeView, setActiveView, setUserDetials, setRefreshFlag, myNumber} = props;

	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	// const [activeView, setActiveView] = useState('overview');

	const handleLogout = async ()=>{
		// console.log('I was clicked!')
		const response = await axios.post("http://localhost:5000/api/logout", {}, {withCredentials:true});
		// const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/logout", {}, {withCredentials:true});
		dispatch(isLoggedOut());
		navigate("/");
		window.location.reload();
	};

	
	let retrievedData;
	const [psychiatristDetails, setPsychiatristDetails] = useState({
		name: "",
		specialization: "",
		email: "",
		avatar: "",
	})


	const pathName = 'usePathname';

	const GetPsychiatristInfo = async ()=>{
		try
		{
			// https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/getPsychiatristDetails/
			// https://university-student-psychiatrist.onrender.com/
			// const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/psychiatristDetails/getPsychiatristDetails`, {withCredentials:true});
			const response = await axios.get(`http://localhost:5000/api/psychiatristDetails/getPsychiatristDetails`, {withCredentials:true});
	
			if (response.data.success)
			{
				retrievedData = response.data.data;
				setPsychiatristDetails({
					name: retrievedData.fullName,
					specialization: retrievedData.specilization,
					email: "",
					avatar: retrievedData.image,
				});

				setUserDetials(retrievedData.fullName);

			}
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}


	}
	useEffect(()=>{
		GetPsychiatristInfo()
	}, []);

	const navigationItems = [
		{ 
			id: 'overview', 
			icon: <Home className="w-5 h-5" />, 
			label: 'Overview',
			badge: null,
			href: "/psychiatristdashboard"
		},
		{ 
			id: 'sessions', 
			icon: <Clock className="w-5 h-5" />, 
			label: 'Sessions',
			badge: null,
			href: "/psychiatristdashboard/session"

		},
		{ 
			id: 'booked-sessions', 
			icon: <CheckSquare className="w-5 h-5" />, 
			label: 'Booked Sessions',
			badge:myNumber ,
			href: "/psychiatristdashboard/viewbookedsessions"
		},
		{ 
			id: 'messages', 
			icon: <MessageSquare className="w-5 h-5" />, 
			label: 'Messages',
			badge: 3,
			href: "/psychiatristdashboard/messages"
		},
		{ 
			id: 'feedback', 
			icon: <FileText className="w-5 h-5" />, 
			label: 'Feedback',
			badge: 12,
			href: "/psychiatristdashboard/feedback"
		},
		{ 
			id: 'profile', 
			icon: <User className="w-5 h-5" />, 
			label: 'Profile',
			badge: null,
			href: "/psychiatristdashboard/profile"

		}
	];

	/*		{ 
			id: 'calendar', 
			icon: <Calendar className="w-5 h-5" />, 
			label: 'Calendar',
			badge: null,
			href: "/psychiatristdashboard/calendar"

		},
	*/

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className={`bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 ${
				sidebarCollapsed ? 'w-20' : 'w-64'
			} flex flex-col`}>
				{/* Logo & User Info */}
				<div className="p-6 border-b border-blue-500">
				{!sidebarCollapsed ? (
					<div>
						<div className="flex items-center space-x-3">
							<img
								src={psychiatristDetails.avatar ? psychiatristDetails.avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop"}
								alt={psychiatristDetails.name ? psychiatristDetails.name: "loading"}
								className="w-12 h-12 rounded-full object-cover border-2 border-white"
							/>
							<div className="flex-1 min-w-0">
								<p className="font-bold text-white truncate">{psychiatristDetails.name ? psychiatristDetails.name: "loading"}</p>
								<p className="text-xs text-blue-200 truncate">{psychiatristDetails.specialization  ? psychiatristDetails.specialization :"loading"}</p>
							</div>
						</div>
					</div>
				) : (
					// this is when sidebar is collapsed: sidebarCollapsed == true
					<div className="flex flex-col items-center">
						<Heart className="w-8 h-8 mb-3" />
						<img
							src={psychiatristDetails.avatar ? psychiatristDetails.avatar : "loading"}
							alt={psychiatristDetails.name ? psychiatristDetails.name : "loading"}
							className="w-12 h-12 rounded-full object-cover border-2 border-white"
						/>
					</div>
				)}
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

					{navigationItems.map((item) => (
						<button
							key={item.id}
							// href={item.href}
							onClick={()=>{
								setActiveView(item.id)
							}

							}
							// interesting: you can pass mutliple conditios to className provided: use {} and then followed `` templateString for condition
							// lastly ${playWithCondtion}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition 
								${
									activeView === item.id ? 'bg-white text-blue-600': 'text-blue-100 hover:bg-blue-500'
								} 
								${
									sidebarCollapsed ? 'justify-center' : ''
								}`
							}
							title={sidebarCollapsed ? item.label : ''}
						>
						<div className="flex items-center space-x-3">
							{item.icon}
							{!sidebarCollapsed && <span className="font-semibold">{item.label}</span>}
						</div>
						{!sidebarCollapsed && item.badge && (
							<span className={`px-2 py-1 text-xs font-bold rounded-full ${
							pathName === item.href
								? 'bg-blue-600 text-white'
								: 'bg-blue-500 text-white'
							}`}>
							{item.badge}
							</span>
						)}
						</button>
					))}
				</nav>


				{/* Refresh */}
				<div className="p-4 border-t border-blue-500">
					<button
						onClick={() => setRefreshFlag((prev:boolean)=>!prev) }
						className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
					>
						{sidebarCollapsed ? <RefreshCw className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
						{!sidebarCollapsed && <span  title='Refresh' className="font-semibold">Refresh</span>}
					</button>
				</div>
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
					<button  onClick={handleLogout} className={`w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition ${
						sidebarCollapsed ? 'justify-center' : ''
					}`}>
						<LogOut className="w-5 h-5" />
						{!sidebarCollapsed && <span className="font-semibold">Logout</span>}
					</button>
				</div>
			</aside>
		</div>
  );
}

export default PsychiatristSidebar