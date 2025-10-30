'use client';
import React, { useState } from 'react';
import { Heart, Home, Calendar, MessageSquare, FileText, LogOut, User, Clock, CheckSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

export default function PsychiatristSidebar() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [activeView, setActiveView] = useState('overview');

	// Sample psychiatrist data
	const psychiatristData = {
		name: "Dr. Sarah Mwangi",
		specialization: "Anxiety & Depression",
		email: "sarah.mwangi@zetech.ac.ke",
		avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop"
	};



	return (
		<div className="flex h-screen bg-gray-50">
		{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				{/* Top Bar */}
				<div className="bg-white shadow-sm sticky top-0 z-10">
				<div className="px-8 py-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-900">
					{/* {navigationItems.find(item => item.id === activeView)?.label} */}
					</h2>
					<div className="flex items-center space-x-4">
					<button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
						<Bell className="w-6 h-6" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>
					<div className="text-right">
						<p className="text-sm font-semibold text-gray-900">{psychiatristData.name}</p>
						<p className="text-xs text-gray-600">{psychiatristData.email}</p>
					</div>
					</div>
				</div>
				</div>

				{/* Content Area */}
				<div className="p-8">
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
				</div>
			</main>
		</div>
	);
}