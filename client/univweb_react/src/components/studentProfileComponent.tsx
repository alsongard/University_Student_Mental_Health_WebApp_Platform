import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Eye, Camera } from "lucide-react";
import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import type { StudentProfile } from "../types";
    // RENDERPROFILE
export default function StudentProfile(props:any)
{
    // const {} = props;
    const {refreshView} = props;
    const apiURL = import.meta.env.VITE_API_URL;
    let retrievedData;
    const [isEditDetails, setIsEditDetails] = useState(false)
    const [studentDetails, setStudentDetails] = useState<StudentProfile>({
        name: "",
        admissionNumber: "",
        email: "",
        avatar : "",
        phoneNumber: "", 
        course: "", 
        image: "",
        yearOfStudy: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhoneNumber: "",
        emergencyContactRelation: ""
    });

    const studentId = localStorage.getItem("studentId");
    const [studentDetailsState, setStudentDetailsState] = useState(false);
    const [errorOnProfileFetch, seterrorOnProfileFetch] = useState(false);
    const getStudentDetails = useCallback(async ()=>
    {
        try
        {
            // ON RENDER
            // /api/student
            // const response = await axios.get(`https://university-student-psychiatrist.onrender.com/api/studentDetails/getStudentDetails`, {withCredentials:true})
            const response = await axios.get(`${apiURL}/api/studentDetails/getStudentDetails`, {withCredentials:true})
            // console.log('response')
            
            // console.log(response);
            if (response.data.success)
            {
                setStudentDetailsState(true);
                retrievedData =  response.data.data;
                setStudentDetails({
                    name: retrievedData.studentName,
                    admissionNumber: retrievedData.studentId.studentAdmissionNum,
                    email: retrievedData.studentId.email,
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                    phoneNumber: retrievedData.phoneNumber,
                    course: retrievedData.course,
                    image: retrievedData.image,
                    yearOfStudy: retrievedData.yearOfStudy,
                    address: retrievedData.address,
                    emergencyContactName: retrievedData.emergencyContact.name,
                    emergencyContactPhoneNumber: retrievedData.emergencyContact.phoneNumber,
                    emergencyContactRelation: retrievedData.emergencyContact.relationship
                });
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
            seterrorOnProfileFetch(true);
        }
    }, []);

    useEffect(()=>{
        getStudentDetails();
    }, [refreshView.profile]);

    
    // Sample student data
    const [changePasswordView, setChangePasswordView] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: "",
        confirmPassword: "",
        password: ""
    });


    const handlePasswordInfo = (event)=>{
        const {name, value} = event.target;
        setPasswordInfo((prevData)=>{
            return {...prevData, 
                [name]:value
            }
        })
    };


    const [viewPassword, setViewPassword] = useState("password");
    
    const handleChange = (event)=>{
        const [name, value] = event?.target;
        if (isEditDetails)
        {
            setStudentDetails((prevData)=>{
                return {
                    ...prevData, 
                    [name]: value
                }
            })
        }
    };


    const handleViewPassword = ()=>{
        if (viewPassword === "password")
        {
            setViewPassword("text");
        }
        else
        {
            setViewPassword("password");
        }
    };


    const [successChangePassword, setSuccessChangePassword] = useState(false);
    const handleUpdatePassword = useCallback(async ()=>
    {
        try
        {
            // const response = await axios.put("https://university-student-psychiatrist.onrender.com/api/studentDetails/updateStudentPassword/", passwordInfo, {withCredentials:true})  
            const response = await axios.put(`${apiURL}/api/student/studentChangePassword/`, passwordInfo,{withCredentials:true})  
            // console.log(response);
            if (response.data.success)
            {
                alert("Password Updated Successfully");
                setPasswordInfo({
                    currentPassword: "",
                    confirmPassword: "",
                    password: ""
                })
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }, []);
    

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('files', selectedFile);
        console.log("formData");
        console.log(formData)
        try {
            // const response = await axios.post("${apiURL}/api/uploadFile", formData, {
            const response = await axios.post(`${apiURL}/api/uploadFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
                withCredentials:true
            })
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    
    return (
        <div className="space-y-6 p-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
            {
                studentDetailsState && !errorOnProfileFetch &&
                (
                    <>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-8">
                            <div className="flex justify-between items-end mb-8">
                                <div className="flex flex-row space-x-6">
                                    <img
                                        src={studentDetails.image ? studentDetails.image : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
                                        alt={studentDetails.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 dark:border-blue-500"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{studentDetails.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-300">{studentDetails.admissionNumber}</p>
                                        
                                        {
                                            isEditDetails &&
                                            (
                                                <form onSubmit={handleSubmit}>
                                                    <input 
                                                        type="file" 
                                                        multiple={false} 
                                                        onChange={handleFileChange}
                                                        className="dark:text-gray-300"
                                                    />
                                                    <button className="mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold text-sm">
                                                        Change Photo
                                                    </button>
                                                </form>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='space-x-2'>
                                    {
                                        isEditDetails &&
                                        <button className="mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                                            Save Changes
                                        </button>
                                    }
                                    <button onClick={()=>{setIsEditDetails((prevData)=>!prevData)}} className={`mt-2 px-4 py-2 ${isEditDetails === true && 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600'} ${isEditDetails === false && 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'} text-white rounded-lg transition font-semibold text-sm`}>
                                        {isEditDetails == false && "Edit Details"}
                                        {isEditDetails == true && "Exit Editing"}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* FULL NAME */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    {
                                        isEditDetails && (
                                            <input
                                                name="name"
                                                type="text"
                                                value={studentDetails.name}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                                onChange={handleChange}
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.name}</p>
                                    }
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="email"
                                                type="email"
                                                value={studentDetails.email}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.email}</p>
                                    }
                                </div>

                                {/* ADMISSION NUMBER */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Admission Number</label>           
                                    <p className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-400 cursor-not-allowed">{studentDetails.admissionNumber}</p>
                                </div>  

                                {/* PHONE NUMBER */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="phoneNumber"
                                                type="text"
                                                value={studentDetails.phoneNumber}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.phoneNumber}</p>
                                    }
                                </div>

                                {/* COURSE */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Course</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="course"
                                                type="text"
                                                value={studentDetails.course}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.course}</p>
                                    }
                                </div>

                                {/* ADDRESS */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="address"
                                                type="text"
                                                value={studentDetails.address}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.address}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Emergency Contact Details</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Manage and view Emergency Contact Details.</p>
                            
                            <div className="space-y-4">
                                {/* EMERGENCY CONTACT NAME */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Name</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="emergencyContactName"
                                                type="text"
                                                value={studentDetails.emergencyContactName}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.emergencyContactName}</p>
                                    }
                                </div>

                                {/* EMERGENCY CONTACT PHONE NUMBER */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Phone Number</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="emergencyContactPhoneNumber"
                                                type="text"
                                                value={studentDetails.emergencyContactPhoneNumber}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.emergencyContactPhoneNumber}</p>
                                    }
                                </div>

                                {/* EMERGENCY CONTACT RELATION */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Relation</label>
                                    {
                                        isEditDetails &&
                                        (
                                            <input
                                                name="emergencyContactRelation"
                                                type="text"
                                                value={studentDetails.emergencyContactRelation}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )
                                    }
                                    {
                                        !isEditDetails &&
                                        <p className='w-full px-4 py-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>{studentDetails.emergencyContactRelation}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Change Password Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-8">
                            <button className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold" onClick={()=>{setChangePasswordView((prevData)=>!prevData)}}>
                                {!changePasswordView && "Change Password"}
                                {changePasswordView && "Exit Changing Password"}
                            </button>
                            
                            {
                                changePasswordView &&
                                (
                                <div className="space-y-4 mt-6">
                                    <div>
                                        <p className='py-[10px] text-gray-700 dark:text-gray-300'>To change password enter your current password and fill in the confirm and new password fields.<br/> Ensure they both match</p>
                                        
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                                        <div className="flex flex-row border border-gray-300 dark:border-gray-600 items-center rounded-lg bg-white dark:bg-gray-700 focus:outline-2 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent">
                                            <input
                                                name='currentPassword'
                                                type={viewPassword}
                                                className="w-full py-3 px-2.5 bg-transparent text-gray-900 dark:text-white focus:outline-0 rounded-lg"
                                                value={passwordInfo.currentPassword}
                                                onChange={handlePasswordInfo}
                                            />
                                            <Eye className="mr-[20px] text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={handleViewPassword}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                        <div className="flex flex-row border border-gray-300 dark:border-gray-600 items-center rounded-lg bg-white dark:bg-gray-700 focus:outline-2 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent">
                                            <input
                                                name="password"
                                                type={viewPassword}
                                                onChange={handlePasswordInfo}
                                                value={passwordInfo.password}
                                                className="w-full py-3 px-2.5 bg-transparent text-gray-900 dark:text-white focus:outline-0 rounded-lg"
                                            />
                                            <Eye className="mr-[20px] text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={handleViewPassword}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                        <div className="flex flex-row border border-gray-300 dark:border-gray-600 items-center rounded-lg bg-white dark:bg-gray-700 focus:outline-2 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent">
                                            <input
                                                type={viewPassword}
                                                name="confirmPassword"
                                                value={passwordInfo.confirmPassword}
                                                onChange={handlePasswordInfo}
                                                className="w-full py-3 px-2.5 bg-transparent text-gray-900 dark:text-white focus:outline-0 rounded-lg"
                                            />
                                            <Eye className="mr-[20px] text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={handleViewPassword}/>
                                        </div>
                                    </div>

                                    <button onClick={handleUpdatePassword} className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold">
                                        Update Password
                                    </button>

                                    {
                                        successChangePassword && (
                                            <p className="bg-green-500 dark:bg-green-600 text-white py-2.5 pl-1 rounded-md">Password has been Successfully updated</p>
                                        )
                                    }
                                </div>
                                )
                            }
                        </div>        
                    </>
                )
            }
            {
                !studentDetails && errorOnProfileFetch &&
                (
                    <p className="text-red-600 dark:text-red-400">Error fetching profile details. Please try again later.</p>
                )
            }
            {
                !studentDetailsState && !errorOnProfileFetch &&
                (
                    <>
                        <p className="text-gray-600 dark:text-gray-400">Register student details again and come back <br/> ...</p>
                        <Link to="/studentdetails" className="text-blue-600 dark:text-blue-400 hover:underline">Link</Link>
                    </>
                )
            }
        </div>
    )
}