const data =  [
		{
			_id: "6936b893ffe855db16b4f72f",
			sessionId: {
				_id: "692db102b44b69bc8646b750",
				date: "2025-12-16T00:00:00.000Z",
				sessionType: "Group Therapy"
			},
			studentId: "69360cd7001a399b72c0b961",
			psychiatristId: {
				_id: "692bbcb9946ace680fc7e177",
				psychiatristName: "Stephen West",
				specilization: "Counselling and Guidance"
			},
			status: "scheduled",
			createdAt: "2025-12-08T11:37:55.171Z",
			updatedAt: "2025-12-08T11:37:55.171Z",
			__v: 0
		}
	]


const calendarSessions =  data.filter((studentSession)=>{
        const theDate = new Date(studentSession.sessionId.date);
        const today = new Date()
        if (theDate > today)
        {
            return studentSession;
        }	
    }).map((studentSession)=>{
        return { sessionDate: studentSession.sessionId.date, sessionType: studentSession.sessionId.sessionType }
    })

// console.log(calendarSessions)


psychiatristViewSessions =  [
	{
		_id: "6936b893ffe855db16b4f72f",
		sessionId: {
			_id: "692db102b44b69bc8646b750",
			date: "2025-12-16T00:00:00.000Z",
			startTime: "14:00",
			endTime: "16:30",
			sessionMode: "In-Person",
			sessionDuration: "2h 30min",
			sessionType: "Group Therapy",
			sessionStatus: "Available"
		},
		studentId: {
			_id: "69360cd7001a399b72c0b961",
			studentAdmissionNum: "AAA-00-0000/0032",
			email: "alsonre@gmail.com"
		},
		psychiatristId: "692bbcb9946ace680fc7e177",
		status: "scheduled",
		createdAt: "2025-12-08T11:37:55.171Z",
		updatedAt: "2025-12-08T11:37:55.171Z"
	}
]

const myTodaySessions = psychiatristViewSessions.filter((sessionBooked)=>{
	const today = new Date();
	sessionDate = new Date(sessionBooked.sessionId.date)
	if (sessionDate >= today)
	{
		return sessionBooked
	}
});
// console.log(`myTodaySessions: ${myTodaySessions.length}`)




const getPsychAllSessions =  [
		{
			currentBookings: 0,
			_id: "692c109b12876bc52b87e490",
			psychiatristId: "692bbcb9946ace680fc7e177",
			date: "2025-11-30T10:00:00.000Z",
			startTime: "10:00 AM",
			endTime: "16:00 PM",
			sessionType: "Individual Therapy",
			sessionStatus: "Available",
			__v: 0,
			sessionMode: "In-Person",
			sessionDuration: "2 hr",
			maxBookings: 2
		},
		{
			currentBookings: 0,
			_id: "692cbf954399c19ce2b3e6fb",
			psychiatristId: "692bbcb9946ace680fc7e177",
			date: "2025-12-02T00:00:00.000Z",
			startTime: "08:30 AM",
			endTime: "13:00 PM",
			sessionMode: "In-Person",
			sessionDuration: "2 hr",
			sessionType: "Individual Therapy",
			sessionStatus: "Available",
			maxBookings: 1,
			__v: 0
		},
		{
			_id: "692db102b44b69bc8646b750",
			psychiatristId: "692bbcb9946ace680fc7e177",
			date: "2025-12-16T00:00:00.000Z",
			startTime: "14:00",
			endTime: "16:30",
			sessionMode: "In-Person",
			sessionDuration: "2h 30min",
			sessionType: "Group Therapy",
			sessionStatus: "Available",
			currentBookings: 0,
			maxBookings: 1,
			createdAt: "2025-12-01T15:15:14.432Z",
			updatedAt: "2025-12-01T15:15:14.432Z",
			__v: 0
		}
]

getPsychAllSessions.filter((sessionInfo)=>{
	const today = new Date();
	const theDate = new Date(sessionInfo.date);
	if (theDate >= today)
	{
		return sessionInfo;
	}
})

// const objectId = new ObjectId("507f1f77bcf86cd799439011");

// console.log(typeof(objectId));



const sessionDetails = {
  _id: "693c2d7f024e044c1eca3eed",
  createdAt: "2025-12-12T14:58:07.899Z",
  currentBookings: 0,
  date: "2025-12-31T00:00:00.000Z",
  endTime: "12:00",
  maxBookings: 10,
  psychiatristId: { _id: "692bbcb9946ace680fc7e177" }
};

const psychiatristDetails =
{
  id: {
    oid: "6939c45d446162c08bb9b3da"
  },
  psychiatristId: {
    oid: "692bbcb9946ace680fc7e177"
  },
  fullName: "Dr. Michael Chen",
  phoneNumber: "+1-555-0147",
  specilization: "Depression & Anxiety",
}






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