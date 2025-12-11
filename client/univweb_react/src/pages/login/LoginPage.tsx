import React, { useState, useEffect } from 'react';
import { Heart, User, Mail, Lock, CreditCard, UserCircle, Stethoscope, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import axios from "axios";
import { connect } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'

function AuthForms(props:any) 
{

    const navigate = useNavigate();
    const params = useParams();
    const pageArgument = params.id || 'student';

    
    
    // const pathName =usePathname();
    // const router = useRouter();
    // const pageArgument = pathName.split("/")[2];  // [ '', 'login', 'psychiatrist' ]
    // console.log(pathName); // /login/psychiatrist
    // console.log(pageArgument);// psychiatrist 
    const [displayStudent, setDisplayStudent] = useState(false);
    const [displayPsychiatrist, setDisplayPsychiatrist] = useState(false);

    useEffect(()=>{
        if (pageArgument === "student")
        {
            setDisplayStudent(true);
        }
    
        if (pageArgument === "psychiatrist")
        {
            setDisplayPsychiatrist(true);
        }
    },[])

    const [userType, setUserType] = useState('student');
    const [formMode, setFormMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [studentSignupData, setStudentSignupData] = useState({
        username: '',
        email: '',
        admissionNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [psychiatristLoginData, setPsychiatristLoginData] = useState({
        email: '',
        password: ''
    });

    // const handleStudentLoginChange = (e) => {
    //     const { name, value } = e.target;
    //     setStudentLoginData(prev => ({
    //     ...prev,
    //     [name]: value
    //     }));
    // };

    const handleStudentSignupChange = (e) => {
        const { name, value } = e.target;
        setStudentSignupData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handlePsychiatristLoginChange = (e) => {
        const { name, value } = e.target;
        setPsychiatristLoginData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const [errorMsg, setErrorMsg] = useState('');
    // state for success
    const [studentSuccess, setStudentSuccess] = useState(false);

    // state for otp verification
    const [ otpForm, setOtpForm] = useState(false);

    // state for otp value
    const [otpValue, setOtpValue] = useState('');
    const handleOtp = async (event)=>{
        // console.log(`Otp Value: ${otpValue}`);
        event.preventDefault()
        try 
        {
            const studentId = localStorage.getItem("studentId")
            const token = localStorage.getItem('token');

            // GETOPT
            // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/student/getOTP",

            const response = await axios.post("http://localhost:5000/api/student/getOTP",
                {
                    userOtp: otpValue,
                    token: token,
                    studentId: studentId
                },
                {withCredentials:true},
            )
            if (response.data.success) {
                // Handle successful OTP verification
                console.log('this is response');
                setStudentSuccess(true);
                navigate("/studentdetails");
            }
        } catch (err) {
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
                setErrorMsg("Invalid OTP. Please try again.");
            }
        }
    }
    const handleStudentSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try
        {
            if (formMode === "login" )
            {
                console.log(`entering loginform submit`)
                console.log('formDAta submitted');
                console.log(studentSignupData)

                // LOGIN
                // const Loginresponse = await axios.post("https://university-student-psychiatrist.onrender.com/api/student/studentLogin", {
                const Loginresponse = await axios.post("http://localhost:5000/api/student/studentLogin", {
                    studentAdmission: studentSignupData.admissionNumber,
                    password:  studentSignupData.password
                });
                // const response = await signIn('credentials',{
                //     email: studentSignupData.email,
                //     password: studentSignupData.password,
                //     admissionNum: studentSignupData.admissionNumber,
                //     redirect:false
                // })
                console.log(Loginresponse);
                if (Loginresponse.status === 200)
                {
                    // get student name
                    const {email} = Loginresponse.data.data.studentInfo;
                    console.log(Loginresponse.data.data)
                    const authToken = Loginresponse.data.data.authToken;
                    const studentId = Loginresponse.data.data.studentId;
                    localStorage.setItem("studentId", studentId);
                    localStorage.setItem('authToken', authToken);    
                    localStorage.setItem("email", email);
                    setStudentSuccess(true);
                    props.onLoggedIn()
                    setTimeout(()=>{
                        setStudentSuccess(false);
                        navigate("/studentdashboard")
                    }, 5000);
                }


            }
            if (formMode === "signup")
            {

                console.log(`entering singnupform submit`)

                if (studentSignupData.password !== studentSignupData.confirmPassword)
                {
                    alert('Passwords do not match!');
                    return;
                }
                const response = await axios.post("http://localhost:5000/api/student/studentCreate", {
                    studentAdmissionNum:studentSignupData.admissionNumber,
                    email:studentSignupData.email,
                    password:studentSignupData.password,
                });
                if (response.data.success)
                {

                    setStudentSuccess(true);
                    setTimeout(()=>{
                        setStudentSuccess((prevValue)=>{return !prevValue});
                        setOtpForm(true);
                    }, 5000);
                    
                    console.log(response.data.data.token);
                    console.log(response.data.data.studentId);
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem("studentId", response.data.data.studentId);
                }
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
            console.log('err.response');
            console.log(err.response.data.msg);

            if (err.response.data.msg === "Invalid credentials")
            {
                setErrorMsg("Invalid credentials.");
                setInterval(()=>{
                    setErrorMsg('');
                }, 5000);
            }
            if (err.response.data.msg)
            {
                setErrorMsg(err.response.data.msg);
            }

            setTimeout(()=>{
                setErrorMsg("")
            }, 5000)
            // handling error from backend
            // if (err)
        }
    };
    
    const [errPsychMessage, setPsychErrorMsg] = useState('');

    const handlePsychiatristLoginSubmit = async (e) => {
        e.preventDefault();
        try
        {
            // https://university-student-psychiatrist.onrender.com/
            // const response = await axios.post("http://localhost:5000/api/psychatriast/psychatriastLogin",
            const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/psychatriast/psychatriastLogin",
                {
                    email : psychiatristLoginData.email,
                    password: psychiatristLoginData.password
                }
            );
            if (response.data.success)
            {
                const psychId = response.data.data.id;
                const authToken = response.data.data.token;
                localStorage.setItem("psychId", psychId);
                localStorage.setItem('authToken', authToken);
                props.onLoggedIn();
                navigate("/psychiatristdashboard");
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
            if (err.response.data.msg === "Invalid credentials")
            {
                setPsychErrorMsg("Credentials did not match. Please try again.");
            }
        }
        // console.log('Psychiatrist Login Data:', psychiatristLoginData);
        // alert('Psychiatrist Login Submitted!\nCheck console for data.');
    };

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-50 dark:from-gray-800 to-blue-100 dark:to-gray-800 flex items-center justify-center p-4">
            {
                otpForm && 
                (
                    <div className='bg-white rounded-md p-4'>
                        <p className="text-sm text-gray-700 text-center">
                            <strong>Enter OTP</strong>
                        </p>
                        <input value={otpValue} onChange={(e)=>{setOtpValue(()=>e.target.value)}} type="text" placeholder='Enter Otp' className="mt-2 w-full p-2 border border-gray-300 rounded" />
                        <button onClick={handleOtp} className="mt-2 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer">
                            Verify Otp
                        </button>

                        {
                            // HANDLING ERROR
                            errorMsg && (
                                <p className="text-red-600  font-semibold">{errorMsg}</p>
                            )
                        }
                    </div>
                )
            }   
            {
                !otpForm && (
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <Heart className="w-10 h-10 text-blue-600" />
                                <span className="text-3xl font-bold dark:text-white text-gray-900">MindBridge</span>
                            </div>
                            <p className="text-gray-600 dark:text-white">Student Mental Health Support</p>
                        </div>

                        {/* MANAGING FORM TYPE  BUTTONS FOR FORM: LOGIN/SIGNUP */}
                        <div className="bg-white  dark:bg-gray-200 rounded-lg p-2 mb-6 flex space-x-2 shadow-md">
                            {
                                displayPsychiatrist === true && 
                                (
                                    <button
                                        className={`flex-1 py-3 px-4 rounded-md font-semibold transition flex items-center justify-center space-x-2 ${
                                        userType === 'psychiatrist'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Stethoscope className="w-5 h-5" />
                                        <span>Psychiatrist</span>
                                    </button>
                                )
                            }
                            {
                                displayStudent === true && 
                                (
                                    <button
                                        className="flex-1 dark:bg-gray-300 py-3 px-4 rounded-md font-semibold transition flex items-center justify-center space-x-2 bg-gray-100 text-gray-600"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Student</span>
                                    </button>  
                                )
                            }
                        </div>


                        <div className="bg-white dark:bg-gray-200 rounded-2xl shadow-xl p-8">
                            {
                                displayStudent === true && 
                                (
                                    <>
                                        {/* BUTTONS FOR SETTING SIGNUP & LOGINMODE */}
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
                                                <button
                                                    onClick={() => setFormMode('login')}
                                                    className={`py-2 px-6 rounded-md font-semibold transition ${
                                                    formMode === 'login'
                                                        ? 'bg-white text-blue-600 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Login
                                                </button>
                                                <button
                                                    onClick={() => setFormMode('signup')}
                                                    className={`py-2 px-6 rounded-md font-semibold transition ${
                                                    formMode === 'signup'
                                                        ? 'bg-white text-blue-600 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
            
                                        {/* STUDENT FORM ON  BOTH LOGIN AND SIGNUP */}
                                        <form onSubmit={handleStudentSignupSubmit}>
                                            <h2 className="text-2xl font-bold  text-gray-900 mb-6 text-center">
                                                {formMode === "login" ?  "Student Login" : "Student Sign Up"}
                                            </h2>

                                            <div className="space-y-4">
                                                {/* commented code below */}
                                                    <div>
                                                        {/* <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Username *
                                                            </label>
                                                            <div className="relative">
                                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <UserCircle className="w-5 h-5 text-gray-400" />
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    value={studentSignupData.username}
                                                                    onChange={handleStudentSignupChange}
                                                                    required
                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                                    placeholder="Choose a username"
                                                                />
                                                            </div>
                                                        </div> */}
                                                    </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Email *
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Mail className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={studentSignupData.email}
                                                            onChange={handleStudentSignupChange}
                                                            required
                                                            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                            placeholder="student@zetech.ac.ke"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Admission Number *
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="admissionNumber"
                                                            value={studentSignupData.admissionNumber}
                                                            onChange={handleStudentSignupChange}
                                                            required
                                                            className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                            placeholder="ADM12345"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Password *
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            value={studentSignupData.password}
                                                            onChange={handleStudentSignupChange}
                                                            required
                                                            minLength={8}
                                                            className="w-full text-black pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                            placeholder="Minimum 8 characters"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            ) : (
                                                                <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={clsx(formMode === "signup" ? "block": "hidden")}>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Confirm Password *
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            name="confirmPassword"
                                                            value={studentSignupData.confirmPassword}
                                                            onChange={handleStudentSignupChange}
                                                            required={formMode === "signup" && true}
                                                            className="w-full text-black pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                            placeholder="Re-enter your password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            ) : (
                                                                <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                                    />
                                                    <label className="ml-2 text-sm text-gray-600">
                                                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Privacy Policy</a>
                                                    </label>
                                                </div>

                                                <input
                                                    type="submit"
                                                    value={formMode === "login" ? "Login In" : "Create Account"}
                                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                                                />
                                            </div>
                                        </form>
                                    </>
                                )
                            }

                            {/* Psychiatrist Login Form */}
                            {
                                displayPsychiatrist === true && 
                                (

                                    <>
                                        <form onSubmit={handlePsychiatristLoginSubmit}>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                                Psychiatrist Login
                                            </h2>

                                            <div className="space-y-4">
                                                <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Email *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={psychiatristLoginData.email}
                                                        onChange={handlePsychiatristLoginChange}
                                                        required
                                                        className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                        placeholder="psychiatrist@zetech.ac.ke"
                                                    />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Password *
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            value={psychiatristLoginData.password}
                                                            onChange={handlePsychiatristLoginChange}
                                                            required
                                                            className="w-full text-black pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                            placeholder="Enter your password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            ) : (
                                                                <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <label className="flex items-center">
                                                        <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                                        />
                                                        <span className="ml-2 text-gray-600">Remember me</span>
                                                    </label>
                                                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                                                    Forgot Password?
                                                </a>
                                                </div>

                                                <input
                                                    type="submit"
                                                    value="Login"
                                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                                                />
                                            </div>

                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-gray-700 text-center">
                                                <strong>Note:</strong> This portal is for authorized mental health professionals only.
                                                </p>
                                            </div>
                                        </form>
                                        {
                                            errPsychMessage && (
                                                <>
                                                    <br/>
                                                    <p className="text-red-600 font-semibold">{errPsychMessage}</p>
                                                </>
                                            )
                                        }

                                    </>
                                )
                            }
                            {/* Success Message */}
                            <div className='py-2.5'>  
                            {
                                studentSuccess && (
                                    <>
                                        {
                                            formMode === "login" ?
                                            (
                                                <p className="text-green-800  font-semibold">Login success. You are being redirected to studentdashboard.. </p>
                                            )
                                            :
                                            (
                                                <p className="text-green-800  font-semibold">Signup success. Enter OTP</p>
                                            )
        
                                        }
                                        {
                                            otpForm && (
                                                <p>Account Verified Successfully... You are being navigated to student student details</p>
                                            )
                                        }
                                        
                                    </>
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
                        
                        <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Contact Support</a></p>
                        </div>
                    </div>
                ) 
            }
        </div>
  );
}
const mapDispatchToProps =(dispatch:any)=>{
    return {
        onLoggedIn: ()=>dispatch({type:'ON_LOGGED_IN'})
    }
}
export default connect(null,mapDispatchToProps)(AuthForms);