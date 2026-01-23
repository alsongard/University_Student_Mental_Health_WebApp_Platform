import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from "../../features/auth/authSlicer.js";

export default function OtpPage() 
{
    const apiURL = import.meta.env.VITE_API_URL;
    const [otpValue, setOtpValue] = useState('');
    const [studentSuccess, setStudentSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // HANDLING OTP VERIFICATION
    const handleOtp = async (event)=>{
        // console.log(`Otp Value: ${otpValue}`);
        event.preventDefault()
        try 
        {

            // GETOPT
            // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/student/getOTP",
            // const response = await axios.post("api/student/getOTP",
            // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/student/getOTP",
            const response = await axios.post(`${apiURL}/api/student/getOTP`,
                {
                    userOtp: otpValue,
                },
                {withCredentials:true},
            )
            if (response.data.success) {
                // Handle successful OTP verification
                // console.log('this is response');
                setStudentSuccess("Your otp has been verified successfully! Redirecting to your details page...");
                const {email, role} = response.data.data.studentInfo;
                // console.log(Loginresponse.data.data)
                // localStorage.setItem("email", email);
                const myPayload = {
                    email: email,
                    role: role
                };
                dispatch(isLoggedIn(myPayload));
                setTimeout(()=>{
                    setStudentSuccess("");
                    navigate("/studentdetails");
                }, 5000);
                

            }
        } 
        catch (err) {
            console.error("Error verifying OTP:", err);
            if (err.response.data.msg === 'No user found')
            {
                setErrorMsg(err.response.data.msg)
            }
            if (err.response.data.msg === '  TokenExpiredError: jwt expired')
            {
                setErrorMsg('OTP token entered is invalid!')
            }
            else
            {
                setErrorMsg("Internal Server Error");
            }
        }
    }
    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-50 dark:from-gray-800 to-blue-100 dark:to-gray-800 flex items-center justify-center p-4">
            <div className='bg-white rounded-md p-4'>
                <p className="text-sm text-gray-700 text-center">
                    <strong>Enter OTP</strong>
                </p>
                <input value={otpValue} onChange={(e)=>{setOtpValue(()=>e.target.value)}} type="text" placeholder='Enter Otp' className="mt-2 w-full p-2 border border-gray-300 rounded" />
                <button onClick={handleOtp} className="mt-2 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer">
                    Verify Otp
                </button>
                {
                    studentSuccess &&
                    (
                        <p className="text-green-800  font-semibold">{studentSuccess}</p>
                    )
                }
                {
                    // HANDLING ERROR
                    errorMsg && (
                        <p className="text-red-600  font-semibold">{errorMsg}</p>
                    )
                }
            </div>
        </div>
    )
}
