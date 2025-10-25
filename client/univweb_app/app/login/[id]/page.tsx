'use client';
import React, { useState, useEffect } from 'react';
import { Heart, User, Mail, Lock, CreditCard, UserCircle, Stethoscope, Eye, EyeOff } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function AuthForms(props:any) 
{
    const pathName =usePathname();
    const pageArgument = pathName.split("/")[2];

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

    const [studentLoginData, setStudentLoginData] = useState({
        emailOrAdmission: '',
        password: ''
    });

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

    const handleStudentLoginChange = (e) => {
        const { name, value } = e.target;
        setStudentLoginData(prev => ({
        ...prev,
        [name]: value
        }));
    };

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

    const handleStudentLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Student Login Data:', studentLoginData);
        alert('Student Login Submitted!\nCheck console for data.');
    };

    const handleStudentSignupSubmit = (e) => {
        e.preventDefault();
        if (studentSignupData.password !== studentSignupData.confirmPassword) {
        alert('Passwords do not match!');
        return;
        }
        console.log('Student Signup Data:', studentSignupData);
        alert('Student Signup Submitted!\nCheck console for data.');
    };

    const handlePsychiatristLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Psychiatrist Login Data:', psychiatristLoginData);
        alert('Psychiatrist Login Submitted!\nCheck console for data.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="w-10 h-10 text-blue-600" />
                    <span className="text-3xl font-bold text-gray-900">MindBridge</span>
                </div>
            <p className="text-gray-600">Student Mental Health Support</p>
            </div>

            <div className="bg-white rounded-lg p-2 mb-6 flex space-x-2 shadow-md">
                {
                    displayPsychiatrist === true && 
                    (
                        <button
                            onClick={() => {
                            setUserType('psychiatrist');
                            setFormMode('login');
                            }}
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
                            className="flex-1 py-3 px-4 rounded-md font-semibold transition flex items-center justify-center space-x-2 bg-gray-100 text-gray-600"
                        >
                            <User className="w-5 h-5" />
                            <span>Student</span>
                        </button>  
                    )
                }
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
            {displayStudent === true && (
                <>
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

                {/* {formMode === 'login' && (
                    <form onSubmit={handleStudentLoginSubmit}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Student Login
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email or Admission Number *
                                </label>
                            <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="emailOrAdmission"
                                        value={studentLoginData.emailOrAdmission}
                                        onChange={handleStudentLoginChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="student@zetech.ac.ke or ADM12345"
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
                                        value={studentLoginData.password}
                                        onChange={handleStudentLoginChange}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                    </form>
                )} */}

                
                    <form onSubmit={handleStudentSignupSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Student Sign Up
                    </h2>

                    <div className="space-y-4">
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
                                    required
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
                        value="Create Account"
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                        />
                    </div>
                    </form>
                
                </>
            )}

            {displayPsychiatrist === true && (
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
            )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
            <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Contact Support</a></p>
            </div>
        </div>
        </div>
  );
}