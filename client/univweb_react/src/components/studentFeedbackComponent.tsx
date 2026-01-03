import axios from "axios";
import { useEffect, useState } from "react";
import StudentFeedbackForm from "./studentFeedbackForm";
export default function StudentFeedBack() 
{
    const studentId = localStorage.getItem('studentId');
    // set state for feedbacks
    const [myFeedBack, setMyFeedbacks] = useState([]);
    const [studentSessions, setStudentSessions] = useState([]);
    // get StudentFeedback from backend API here
    const getStudentFeedback = async ()=>   
    {
        try
        {
            // http://localhost:5000/
            const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/feedback/getStudentFeedback`, {withCredentials:true});
            // const response = await axios.get(`http://localhost:5000/api/feedback/getStudentFeedback`, {withCredentials:true});
    
            if (response.data.success)
            {
                setMyFeedbacks(response.data.data);
                // console.log("Fetched Student Feedback:");
            }
        }
        catch(err)
        {
            console.error("Error fetching student feedback:", err);
        }
    }
    const getStudentSessions  = async ()=>
    {
        try
        {
            // https://university-student-psychiatrist.onrender.com
            // const response = await axios.get("http://localhost:5000/api/bookSession/getStudentBookedSessions", {withCredentials:true});
            const response = await axios.get("https://university-student-psychiatrist.onrender.com/api/bookSession/getStudentBookedSessions", {withCredentials:true});
            // console.log('response.data');
            // console.log(response.data);
            setStudentSessions(response.data.data)
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }
    useEffect(()=>{
        // Fetch feedbacks when component mounts
        getStudentFeedback();
        getStudentSessions();
    }, []);
    // Sample feedbacks : ARRAY
    // setInterval(()=>{
    //     console.log(myFeedBack)}
    //     , 9000)

    const [feedBackView , setFeedBackView] = useState(false);
    const [singleSession, setSingleSession] = useState({});

    if (feedBackView)
    {
        return (<StudentFeedbackForm setFeedBack={setFeedBackView} sessionData={singleSession}/>)
    }
    return (
        <div className="space-y-6 p-5">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Session Feedback</h1>
  
            </div>

            <div className="space-y-4">
                {
                    myFeedBack.length === 0 && (
                        <div className="dark:text-white dark:bg-slate-600  p-5 bg-gray-300 rounded-md">
                            <p>No Feedbacks</p>
                        </div>
                    )
                }

                { 
                    myFeedBack && myFeedBack.length > 0 &&
                    (
                        myFeedBack.map((feedback) => (
                            <div key={feedback._id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">{feedback.fullName}</h3>
                                    <h3 className="font-bold text-gray-900">{feedback.specilization}</h3>
                                    {/* <p className="text-sm text-gray-600">Session Date: {feedback.bookingId.sessionId ?  feedback.bookingId.sessionId : `NONE`}</p> */}
                                </div>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                    ))}
                                </div>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                                    <p className="text-gray-700">{feedback.feedbackMessage}</p>
                                </div>

                                {/*  THIS FEATURE WIL NOT BE IMPLELEMENTED FOR NOW*/}
                                {/* {feedback.feedbackMessage && (
                                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Psychiatrist Response:</p>
                                    <p className="text-gray-700">{feedback.response}</p>
                                </div>
                                )} */}
                            </div>
                        ) 
                ))}
                {
                    studentSessions.length == 0 ?
                    (
                        <p>No student Sessions Yet... Book and Attend the session to get started</p>
                    )
                    : 
                    (
                        studentSessions.filter(session => !session.feedbackExist).map((session)=>(
                            <div key={session._id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{session.fullName}</h3>
                                        {/* <p className="text-sm text-gray-600">Session Date: {new Date(session.sessionId.date).toLocaleDateString('en-US', {weekday:'long', month:'long', year:'numeric'})}</p> */}
                                        <p className="text-sm text-gray-600">Session Date: {new Date(session.sessionId.date).toDateString()}</p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <div>
                                        <p className="font-bold text-gray-900">FeedBack Status</p>
                                        <p className="text-sm text-gray-600">{session.feedbackExist ? "Exist" : "No Feedback"}</p>
                                    </div>

                                    {!session.feedbackExist && 
                                        (
                                            <button onClick={()=>{setFeedBackView(true); setSingleSession(session)}} className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                                                Add Feedback
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    )
                }

            </div>
        </div>
    )
}
/*
<div key={feedback.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{feedback.psychiatristName}</h3>
                <p className="text-sm text-gray-600">Session Date: {feedback.sessionDate}</p>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <p className="text-gray-700">{feedback.comment}</p>
            </div>

            */