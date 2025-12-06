import axios from "axios";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { current } from "@reduxjs/toolkit";
    // RENDERPROFILE
export default  function StudentProfile()
{
    let retrievedData;
    const [isEditDetails, setIsEditDetails] = useState(false)
    const [studentDetails, setStudentDetails] = useState(
        {
            name: "",
            admissionNumber: "",
            email: "",
            avatar : "",
            phoneNumber: "", 
            course: "", 
            yearOfStudy: "",
            address: ""
        }
    );
    const getStudentDetails = async ()=>{
        try
        {
            const response = await axios.get("http://localhost:5000/api/studentDetails/getStudentDetails/690362a78d4fa3a14a78a9e3")
            console.log(response);
            if (response.data.success)
            {
                retrievedData =  response.data.data;
                setStudentDetails({
                    name: retrievedData.studentName,
                    admissionNumber: retrievedData.studentId.studentAdmissionNum,
                    email: retrievedData.studentId.email,
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                    phoneNumber: retrievedData.phoneNumber,
                    course: retrievedData.course,
                    yearOfStudy: retrievedData.yearOfStudy,
                    address: retrievedData.address
                });
            }
        }
        catch(err){console.log(`Error: ${err}`)}
    }

    useEffect(()=>{
        getStudentDetails();
    }, []);

    
    // Sample student data
    const [changePasswordView, setChangePasswordView] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: "",
        confirmPassword: "",
        password: ""
    })
    const handlePasswordInfo = (event)=>{
        const {name, value} = event.target;
        setPasswordInfo((prevData)=>{
            return {...prevData, 
                [name]:value
            }
        })
    }
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
    }
    const handleViewPassword = ()=>{
        if (viewPassword === "password")
        {
            setViewPassword("text");
        }
        else
        {
            setViewPassword("password");
        }
    }
    const [successChangePassword, setSuccessChangePassword] = useState(false);
    const handleUpdatePassword = async ()=>{
        try
        {
            const response = await axios.put("http://localhost:5000/api/studentDetails/updateStudentPassword/690362a78d4fa3a14a78a9e3", passwordInfo)  
            console.log(response);
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
    }
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900">Profile Settings</h1>

            <div className="bg-white dark:bg-slate-600 rounded-2xl shadow-md p-8">
                <div className="flex justify-between items-end mb-8">
                    <div className="flex  flex-row space-x-6">
                        <img
                            src={studentDetails.avatar}
                            alt={studentDetails.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{studentDetails.name}</h2>
                            <p className="text-gray-600 dark:text-white">{studentDetails.admissionNumber}</p>
                            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg dark:text-white hover:bg-blue-700 transition font-semibold text-sm">
                                Change Photo
                            </button>
                        </div>
                    </div>

                    <button onClick={()=>{setIsEditDetails((prevData)=>!prevData)}} className={`mt-2 px-4  py-2 ${isEditDetails === true && 'bg-red-600 hover:bg-red-700'} ${isEditDetails === false && 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg  transition font-semibold text-sm`}>
                        {isEditDetails == false && "Edit Details"}
                        {isEditDetails == true && "Exit Editing"}
                    </button>
                </div>

                <div className="space-y-4">
                <div>
                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    {
                        isEditDetails && (
                            <input
                                name="name"
                                type="text"
                                value={studentDetails.name}
                                className="w-full px-4 dark:text-white py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                onChange={handleChange}
                            />
                        )
                    }
                    {
                        !isEditDetails &&
                        <p className='w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'>{studentDetails.name}</p>
                    }
                </div>

                <div>
                    <label className="block dark:text-white text-sm font-semibold text-gray-700 mb-2">Email</label>
                    {
                        isEditDetails &&
                        (
                            <input
                                name="email"
                                type="email"
                                value={studentDetails.email}
                                className="w-full dark:text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        )
                    }
                    {
                        !isEditDetails &&
                        <p className='w-full dark:text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'>{studentDetails.email}</p>
                    }
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">Admission Number</label>           
                    <p className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed">{studentDetails.admissionNumber}</p>
                </div>

                <div className="pt-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Save Changes
                    </button>
                </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl dark:bg-slate-600 shadow-md p-8">
                <button className="px-6  py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold" onClick={()=>{setChangePasswordView((prevData)=>!prevData)}}>
                    {!changePasswordView && "Change Password"}
                    {changePasswordView && "Exit Changing Pasword"}
                </button>
                
                {
                    changePasswordView &&
                    (
                    <div className="space-y-4 ">
                        <div>
                            <p className='py-[10px] dark:text-white'>To change password enter your current password and fill in the confirm and new password fields.<br/> Ensure they both match</p>
                            
                                <label className=" text-sm font-semibold dark:text-white text-gray-700 mb-2">Current Password</label>
                                <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <input
                                        name='currentPassword'
                                        type={viewPassword}
                                        className="w-full py-3 px-2.5  focus:outline-0 rounded-lg"
                                        value={passwordInfo.currentPassword}
                                        onChange={handlePasswordInfo}
                                    />
                                    <Eye className="mr-[20px]" onClick={handleViewPassword}/>
                                </div>

                        </div>

                        <div>
                            <label className="block text-sm font-semibold dark:text-white mb-2">New Password</label>
                                <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <input
                                        name="password"
                                        type={viewPassword}
                                        onChange={handlePasswordInfo}
                                        value={passwordInfo.password}
                                        className="w-full py-3 px-2.5 focus:outline-0"
                                    />
                                    <Eye className="mr-[20px]" onClick={handleViewPassword}/>
                                </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold dark:text-white text-gray-700 mb-2">Confirm New Password</label>
                            <div className="flex flex-row border border-gray-300 items-center rounded-lg focus:outline-2s focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                <input
                                    type={viewPassword}
                                    name="confirmPassword"
                                    value={passwordInfo.confirmPassword}
                                    onChange={handlePasswordInfo}
                                    className="w-full py-3 px-2.5 focus:outline-0"
                                />
                                <Eye className="mr-[20px]" onClick={handleViewPassword}/>
                            </div>

                        </div>
                        <button onClick={handleUpdatePassword} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                            Update Password
                        </button>
                        {
                            successChangePassword && (
                                <p className="bg-green-500 py-2.5 pl-1 rounded-md">Password has been Successfully updated</p>
                            )
                        }
                    </div>
                    )
                }
            </div>
        </div>
    )
}