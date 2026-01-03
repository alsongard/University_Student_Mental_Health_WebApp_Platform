import { useState, useEffect } from "react";
import { Search, Clock, Stethoscope, User, MoveRight, Calendar, Loader, View } from "lucide-react";
import axios from "axios";
import ViewStudentBookedInfo from "../components/viewStudentBookedInfo";
export default function StudentSessionComponent()
{
    const [selectedSession, setSelectedSession] = useState(null);
    const studentId = localStorage.getItem("studentId");    
    const [myUpcomingSessions, setMyUpcomingSessions] = useState([]);
    const getAllSessions = async()=>{
		try
		{
			const response = await axios.get("https://university-student-psychiatrist.onrender.com/api/studentSession/getAllSessions", );
			// const response = await axios.get("http://localhost:5000/api/studentSession/getAllSessions");
            // console.log(response)
            if (response.data.success)
            {
                setMyUpcomingSessions(response.data.data);
            }
		}
		catch(err)
		{
			console.log(`Error: ${err}`);
		}
	}
    useEffect(()=>{
        getAllSessions()
        GetStudentBookedSessions()
    },[]);


    
    const [studentBookedSessions, setStudentBookedSessions] = useState([]);

    const GetStudentBookedSessions = async ()=>{
        try
        {
            const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/bookSession/getStudentBookedSessions`, {withCredentials:true});
            // const response = await axios.get(`http://localhost:5000/api/bookSession/getStudentBookedSessions/`, {withCredentials:true});
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
    const router = "useRouter()"

    const [bookSession, setBookSession] = useState(false);
    const [singleSession, setSingleSession] = useState();
    const [successMessage, setSuccessMessage] = useState(false);

    const handleBookSubmit = async(singleSession:any)=>{
        try
        {
            // console.log('sucess is success'); // Testing
            // const response = await axios.post(`http://localhost:5000/api/bookSession/createBooking`, {
            const response = await axios.post(`https://university-student-psychiatrist.onrender.com/api/bookSession/createBooking`, {
                sessionId: singleSession._id,
                psychiatristId: singleSession.psychiatristId,
                status: "scheduled",
            }, {withCredentials:true});

            if (response.data.success)
            {
                setSuccessMessage(true);
                setTimeout(()=>{
                    setBookSession(false);
                }, 3000);
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`)
        }
    }

    if (bookSession)
    {
        // console.log('single session');
        // console.log(singleSession);
        return (
            <>
                {singleSession &&
                    (
                        <div className="space-y-6 ">
                            <div className="grid md:grid-cols-2 gap-6  ">
                                <div>
                                    <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">
                                        Psychiatrist Name
                                    </label>
                                    <p
                                        className="w-full  dark:text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    >
                                        {singleSession.fullName}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">
                                        Date 
                                    </label>
                                    <p className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {new Date(singleSession.date).toISOString().split('T')[0]}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm dark:text-white font-semibold text-gray-700 mb-2">
                                        Time 
                                    </label>
                                    <p className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.startTime} - {singleSession.endTime}
                                    </p>  
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">
                                        Duration 
                                    </label>
                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.sessionDuration}
                                    </p>
                                    
                                </div>

                                <div>
                                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">
                                        Session Type *
                                    </label>
                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.sessionType}
                                    </p>
                                </div>

                                <div>
                                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">
                                        Mode *
                                    </label>
                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.sessionMode}
                                    </p>
                                </div>

                                <div>
                                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">
                                        Max Bookings *
                                    </label>
                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.maxBookings} 
                                    </p>
                                </div>

                                <div>
                                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">
                                        Session Status *
                                    </label>
                                    <p className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                        {singleSession.sessionStatus}     
                                    </p>
                                </div>

                            </div>

                            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setBookSession(false);
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300  dark:bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600  transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={()=>{handleBookSubmit(singleSession)}}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                >
                                    Submit
                                </button>
                            </div>
                            {
                                successMessage &&
                                (
                                    <p className='bg-green-600 py-3  px-5 rounded-lg text-[15px]'>New Session Successfuly created</p>
                                )
                            }

                        </div>
                    )
                }
            </>
        )
    }

    const newSessions = myUpcomingSessions && myUpcomingSessions.filter((session)=>{
        const theDate = new Date(session.date.split("T")[0]);
        const today = new Date()
        if (theDate >= today)
        {
            return session
        }
    });
    // console.log('new sessions');
    // console.log(newSessions);

    const getStatusColor = (status) => {
        const colors = {
            scheduled: 'border-blue-400 bg-blue-50',
            completed: 'border-green-400 bg-green-50',
            cancelled: 'border-red-400 bg-red-50',
            pending: 'border-yellow-400 bg-yellow-50'
        };
        return colors[status] || 'border-gray-300 bg-white';
    };

    const getStatusBadge = (status) => {
        const styles = {
            scheduled: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
            pending: 'bg-yellow-100 text-yellow-700'
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const [studentBookedInfo, setStudentBookedInfo] = useState(false);
    const [singleBookedInfo , setSingleBookedInfo] = useState();
    if (studentBookedInfo)
    {
        // return the COMPONENT HERE
        return <ViewStudentBookedInfo setBook={setStudentBookedInfo} bookedSession={singleBookedInfo} />
    }
    //grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
    return (
        <section className='p-8 flex flex-col space-y-[50px] w-full'>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold dark:text-white text-gray-900">Available Sessions</h1>
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
                    {
                        newSessions.length > 0  && (

                            newSessions.map((session) => (
                                <div key={session._id} className="bg-white rounded-xl shadow-md p-6 dark:hover:shadow-[0px_0px_0px_5px_gray] hover:shadow-xl transition">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{session.fullName}</h3>
                                            <p className="text-blue-600 font-semibold">{session.specialization}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                            Available
                                        </span>
                                    </div>
    
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-700">Session Date</p>
                                        <p className=' capitalize'>{new Date(session.date).toISOString().split('T')[0]}</p>  
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-700 ">Available Time Slots:</p>
                                        <div className="space-y-2">
                                            <p className='flex flex-row  space-x-[10px]'>
                                                {session.startTime} &#8594; {session.endTime}
                                            </p>
                                            <p>Remaining Bookings: 1</p>
                                            {/* {session.availableSlots.map((slot, index) =>  ( ))}*/}
                                            <button
                                                // key={index}
                                                // onClick={() => setSelectedSession({ ...session, selectedSlot: slot })} // WORK ON THESE
                                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-sm font-medium text-gray-700"
                                            >
                                                View Session Details
                                            </button>
                                            
                                        </div>
                                    </div>
    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <span className="text-sm text-gray-600">Mode: {session.sessionMode}</span>
                                        <button 
                                            onClick={()=>{
                                                setSingleSession(session);
                                                setBookSession(true)
                                            }} 
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    {
                        myUpcomingSessions.length < 0 && 
                        (
                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                                <p>Loading Sessions</p>
                                <Loader/>
                            </div>
                        )
                    }
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


            {/* STUDENT BOOKED SESSIONS */}
            <div className="">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold dark:text-white text-gray-800">My Sessions</h1>
                    <p className="text-gray-600 dark:text-white text-sm">Your upcoming therapy appointments</p>
                </div>
                {/* <div className=" bg-gradient-to-br from-blue-50 rounded-sm to-indigo-100 p-6"> */}
                <div className="   rounded-sm  py-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="">
                            {
                                studentBookedSessions && studentBookedSessions.length > 0 && 
                                    (studentBookedSessions.map((bookedSession) => (
                                        <div 
                                            key={bookedSession._id} 
                                            // className={`border-2 rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 ${getStatusColor(bookedSession.status)}`}
                                            className={` rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:shadow-gray-500 bg-white `}
                                        >
                                            {/* Status Badge */}
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`text-xs   font-semibold px-3 py-1 rounded-full ${getStatusBadge(bookedSession.status)}`}>
                                                    {bookedSession.status.toUpperCase()}
                                                </span>
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                            </div>

                                            {/* Session Type */}
                                            <div className="mb-4">
                                                <h3 className="text-lg font-bold text-gray-900 capitalize">
                                                    {bookedSession.sessionId.sessionType}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {bookedSession.sessionId.startTime} - {bookedSession.sessionId.endTime}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Psychiatrist Info */}
                                            <div className="mb-4 pb-4 border-b border-gray-200">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <User className="w-4 h-4 text-indigo-600" />
                                                    <p className="font-semibold text-gray-800">{bookedSession.fullName}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="w-4 h-4 text-indigo-600" />
                                                    <p className="text-sm text-gray-600">{bookedSession.specilization}</p>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <div className="mb-4">
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                    Session Date
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {formatDate(bookedSession.sessionId.date)}
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={()=>{
                                                    setStudentBookedInfo(true)
                                                    setSingleBookedInfo(bookedSession);
                                                }} 
                                                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    )))
                            }
                        </div>
                    </div>
                </div>
                {
                    studentBookedSessions.length === 0 && 
                    (
                        <div className="w-full">
                            <div className="text-center  dark:bg-slate-600   rounded-md py-8 text-gray-500">
                                <Calendar className="w-16 dark:text-white h-16 mx-auto mb-4 opacity-30" />
                                    <p className="text-white">No upcoming sessions scheduled</p>
                                <button
                                    onClick={() => setActiveView('sessions')}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                >
                                    Book a Session
                                </button>
                            </div>
                        </div>
                    )
                }

            </div>


            {/* STUDENT PREVIOUS SESSIONS: MAYBE */}
        </section>
    )
}