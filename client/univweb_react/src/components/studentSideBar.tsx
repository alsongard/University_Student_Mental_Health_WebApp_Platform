import { Heart, Home, RefreshCw, Calendar, MessageSquare, FileText, Clock, ChevronLeft, ChevronRight, User, Bell, LogOut, Video, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';
import  { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { isLoggedOut } from '../features/auth/authSlicer';
import axios from 'axios';
import type {RefreshViews} from "../types"
function StudentSideBar(props:any)
{
    const apiURL = import.meta.env.VITE_API_URL;
    const {activeView, setRefreshState, setActiveView} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const pathName = "usePathname";

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    
    const navigationItems = [
        { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Overview', href: "/studentdashboard"},
        { id: 'sessions', icon: <Calendar className="w-5 h-5" />, label: 'View Sessions', href:"/studentdashboard/sessions" },
        { id: 'messages',  icon: <MessageSquare className="w-5 h-5" />, href: "/studentdashboard/messages", label: 'Messages' },
        { id: 'feedback', icon: <FileText className="w-5 h-5" />, label: 'Feedback', href:"/studentdashboard/feedback" },
        { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile', href:"/studentdashboard/profile" }
    ];



    const handleLogout = async ()=>
    {
        localStorage.clear();
        console.log('Running logout');
        // https://university-student-psychiatrist.onrender.com
        // const response = await axios.post("https://university-student-psychiatrist.onrender.com/api/logout", {}, {withCredentials:true});
        const response = await axios.post(`${apiURL}/api/logout`, {}, {withCredentials:true});
        dispatch(isLoggedOut());
        navigate("/",{replace:true});
        window.location.reload();
    };

    const handleRefresh = (view:string)=>{
        setRefreshState((prevValue:RefreshViews)=>{
            // console.log("prevValue");
            // console.log(prevValue);
            // console.log('view');
            // console.log(view)
            return {
                ...prevValue,
                [view]: prevValue[view] + 1
            }
        })
    }

    return (
        // {/* Sidebar */}
        <aside className={`bg-gradient-to-b from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-70'
            } flex flex-col`}
        >
            {/* Logo */} 
            {/* <div className="p-6 flex items-center justify-between border-b border-blue-500">
                {!sidebarCollapsed && (
                    <div className="flex items-center space-x-2">
                        <Heart className="w-8 h-8" />
                        <span className="text-xl font-bold">MindBridge</span>
                    </div>
                )}
                {sidebarCollapsed && <Heart className="w-8 h-8 mx-auto" />}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => 
                            {
                                // console.log(`activeView is: ${item.id}`);
                                setActiveView(item.id);
                            }
                        }
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                            item.id === activeView
                            ? 'bg-white dark:bg-gray-700 dark:text-blue-400 text-blue-600'
                            : 'text-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-blue-500'
                        } ${sidebarCollapsed ? 'justify-center' : ''}`}
                        title={sidebarCollapsed ? item.label : ''}
                    >
                        {item.icon}
                        {!sidebarCollapsed && <span className="font-semibold">{item.label}</span>}
                    </button>
                ))}
            </nav>
            
            {/* Refresh */}
            <div className="p-4 border-t border-blue-500 dark:border-gray-700">
                <button
                    onClick={() => {console.log('Refresh clicked'); handleRefresh(activeView) }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-gray-600 rounded-lg transition"
                >
                    {sidebarCollapsed ? <RefreshCw className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
                    {!sidebarCollapsed && <span title='Refresh' className="font-semibold">Refresh</span>}
                </button>
            </div>

            {/* Collapse Button */}
            <div className="p-4">
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-gray-600 rounded-lg transition"
                >
                    {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    {!sidebarCollapsed && <span className="font-semibold">Collapse</span>}
                </button>
            </div>

            {/* Logout */}
            <div onClick={handleLogout} className="p-4 border-t border-blue-500 dark:border-gray-700">
                <button className={`w-full flex items-center space-x-3 px-4 py-3 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 rounded-lg transition ${
                    sidebarCollapsed ? 'justify-center' : ''
                }`}>
                    <LogOut className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="font-semibold">Logout</span>}
                </button>
            </div>
        </aside>
    )
}

export default StudentSideBar;