import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { MessageSquare } from "lucide-react";
import StudentFeedbackForm from "./studentFeedbackForm";

export default function StudentFeedBack(props:any) 
{
    const {refreshView} = props;
    const apiURL = import.meta.env.VITE_API_URL;
    // set state for feedbacks
    const [myFeedBack, setMyFeedbacks] = useState([]);
    const [studentSessions, setStudentSessions] = useState([]);
    const [feedBackLoading, setFeedBackLoading] = useState(true);
    // get StudentFeedback from backend API here
    const getStudentFeedback = useCallback(async ()=>   
    {
        try
        {
            // http://localhost:5000/
            // const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/feedback/getStudentFeedback`, {withCredentials:true});
            const response = await axios.get(`${apiURL}/api/feedback/getStudentFeedback`, {withCredentials:true});
    
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
    }, []);

    const getStudentSessions  = useCallback(async ()=>
    {
        try
        {
            // https://university-student-psychiatrist.onrender.com
            const response = await axios.get(`${apiURL}/api/bookSession/getStudentBookedSessions`, {withCredentials:true});
            // const response = await axios.get("https://university-student-psychiatrist.onrender.com/api/bookSession/getStudentBookedSessions", {withCredentials:true});
            // console.log('response.data');
            // console.log(response.data);
            if (response.data.msg === "You have no booked sessions")
            {
                console.log('runnign on specific')
                setStudentSessions([]);
                return;
            }
            setStudentSessions(response.data.data)
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    },[]);

    useEffect(()=>{
        // Fetch feedbacks when component mounts
        getStudentFeedback();
        getStudentSessions().finally(()=>setFeedBackLoading(false));
    }, [refreshView.feedback]);
    // Sample feedbacks : ARRAY
    // setInterval(()=>{
    //     console.log(myFeedBack)}
    //     , 9000)

    const [feedBackView , setFeedBackView] = useState(false);
    const [singleSession, setSingleSession] = useState({});

    // if (feedBackView)
    // {
    //     return (<StudentFeedbackForm setFeedBack={setFeedBackView} sessionData={singleSession}/>)
    // }
    

    // const [displaySkeleton, setDisplaySkeleton] = useState(true);

    return (
        feedBackView == true ?
        (
            <StudentFeedbackForm setFeedBack={setFeedBackView} sessionData={singleSession}/>
        )
        :
        
            <div className="space-y-6 p-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Session Feedback</h1>
                </div>

                <div className="space-y-4">
                    { 
                        feedBackLoading  ? 
                        (
                            [1].map((index:number) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
                                    {/* Header Section - Name, Specialization & Rating */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <div key={star} className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Feedback Message Box */}
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                        :myFeedBack.length > 0 ?
                        (
                            <>
                                {myFeedBack.map((feedback) => (
                                    <div key={feedback._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{feedback.fullName}</h3>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{feedback.specilization}</h3>
                                                {/* <p className="text-sm text-gray-600 dark:text-gray-400">Session Date: {feedback.bookingId.sessionId ?  feedback.bookingId.sessionId : `NONE`}</p> */}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < feedback.rating ? 'text-yellow-400 dark:text-yellow-500' : 'text-gray-300 dark:text-gray-600'}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
                                            <p className="text-gray-700 dark:text-gray-300">{feedback.feedbackMessage}</p>
                                        </div>

                                        {/*  THIS FEATURE WILL NOT BE IMPLEMENTED FOR NOW*/}
                                        {/* {feedback.feedbackMessage && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-600 dark:border-blue-500">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Psychiatrist Response:</p>
                                            <p className="text-gray-700 dark:text-gray-300">{feedback.response}</p>
                                        </div>
                                        )} */}
                                    </div>
                                ))
                                }

                                {
                                    studentSessions.length> 0 && studentSessions.filter(session => !session.feedbackExist).map((session)=>
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
                                    )
                                }
                            </>
                        ) 
                        :
                        (
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        No Feedback Yet
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                        You haven't received any feedback from your sessions yet. Feedback from students will appear here after completed sessions.
                                    </p>
                                </div>
                            </div>
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