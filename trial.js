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

console.log(calendarSessions)


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
console.log(`myTodaySessions: ${myTodaySessions.length}`)




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