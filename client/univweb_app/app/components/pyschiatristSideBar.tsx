'use client';
import React, { useState } from 'react';
import { Heart, Home, Calendar, MessageSquare, FileText, LogOut, User, Clock, CheckSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function PsychiatristSidebar() 
{
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [activeView, setActiveView] = useState('overview');
	const pathName = usePathname();

	// Sample psychiatrist data
	const psychiatristData = {
		name: "Dr. Sarah Mwangi",
		specialization: "Anxiety & Depression",
		email: "sarah.mwangi@zetech.ac.ke",
		avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop"
	};

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
			badge:8 ,
			href: "/psychiatristdashboard/viewbookedsessions"
		},
		{ 
			id: 'calendar', 
			icon: <Calendar className="w-5 h-5" />, 
			label: 'Calendar',
			badge: null,
			href: "/psychiatristdashboard/calendar"

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

	const renderContent = () => {
		switch (activeView) {
		case 'overview':
			return (
			<div className="space-y-6">
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
				<h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Mwangi!</h1>
				<p className="text-blue-100">Here's your schedule for today</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
					<div className="flex items-center justify-between">
					<div>
						<p className="text-gray-600 text-sm">Today's Sessions</p>
						<p className="text-3xl font-bold text-gray-900">5</p>
					</div>
					<Calendar className="w-12 h-12 text-blue-600 opacity-20" />
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
					<div className="flex items-center justify-between">
					<div>
						<p className="text-gray-600 text-sm">Total Patients</p>
						<p className="text-3xl font-bold text-gray-900">47</p>
					</div>
					<User className="w-12 h-12 text-green-600 opacity-20" />
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
					<div className="flex items-center justify-between">
					<div>
						<p className="text-gray-600 text-sm">Pending Feedback</p>
						<p className="text-3xl font-bold text-gray-900">12</p>
					</div>
					<MessageSquare className="w-12 h-12 text-purple-600 opacity-20" />
					</div>
				</div>
				</div>

				<div className="bg-white rounded-2xl shadow-md p-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Schedule</h2>
				<div className="space-y-4">
					{[1, 2, 3].map((session) => (
					<div key={session} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition">
						<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
							<User className="w-6 h-6 text-blue-600" />
							</div>
							<div>
							<h3 className="font-bold text-gray-900">John Kamau</h3>
							<p className="text-sm text-gray-600">Individual Therapy</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold text-gray-900">10:00 AM</p>
							<p className="text-sm text-gray-600">In-Person</p>
						</div>
						</div>
					</div>
					))}
				</div>
				</div>
			</div>
			);
		
		case 'sessions':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Sessions</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Session management content here...</p>
				</div>
			</div>
			);
		
		case 'booked-sessions':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Booked Sessions</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Booked sessions content here...</p>
				</div>
			</div>
			);
		
		case 'calendar':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Calendar</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Calendar view content here...</p>
				</div>
			</div>
			);
		
		case 'messages':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Messages content here...</p>
				</div>
			</div>
			);
		
		case 'feedback':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Student Feedback</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Feedback content here...</p>
				</div>
			</div>
			);
		
		case 'profile':
			return (
			<div>
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h1>
				<div className="bg-white rounded-2xl shadow-md p-6">
				<p className="text-gray-600">Profile settings content here...</p>
				</div>
			</div>
			);
		
		default:
			return null;
		}
	};

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
						<div className="flex items-center space-x-2 mb-4">
							<Heart className="w-8 h-8" />
							<span className="text-xl font-bold">MindBridge</span>
						</div>
						<div className="flex items-center space-x-3">
							<img
								src={psychiatristData.avatar}
								alt={psychiatristData.name}
								className="w-12 h-12 rounded-full object-cover border-2 border-white"
							/>
							<div className="flex-1 min-w-0">
								<p className="font-bold text-white truncate">{psychiatristData.name}</p>
								<p className="text-xs text-blue-200 truncate">{psychiatristData.specialization}</p>
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<Heart className="w-8 h-8 mb-3" />
						<img
							src={psychiatristData.avatar}
							alt={psychiatristData.name}
							className="w-12 h-12 rounded-full object-cover border-2 border-white"
						/>
					</div>
				)}
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
				{navigationItems.map((item) => (
					<Link
						key={item.id}
						href={item.href}
						
						className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition 
							${
								pathName === item.href ? 'bg-white text-blue-600': 'text-blue-100 hover:bg-blue-500'
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
					</Link>
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
		</div>
  );
}