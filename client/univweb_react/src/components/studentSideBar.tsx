import { Heart, Home, Calendar, MessageSquare, FileText, Clock, ChevronLeft, ChevronRight, User, Bell, LogOut, Video, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { isLoggedOut } from '../features/auth/authSlicer';
import axios from 'axios';
function StudentSideBar(props:any)
{
    const {activeView, setActiveView} = props;
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



    const handleLogout = async ()=>{
            localStorage.clear();
            console.log('Running logout')
            const response = await axios.post("http://localhost:5000/api/logout", {}, {withCredentials:true});
            dispatch(isLoggedOut());
            navigate("/",{replace:true});
            window.location.reload();
        }
    return (
        // {/* Sidebar */}
        <aside className={`bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 ${
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
                            ? 'bg-white text-blue-600'
                            : 'text-blue-100 hover:bg-blue-500'
                        } ${sidebarCollapsed ? 'justify-center' : ''}`}
                        title={sidebarCollapsed ? item.label : ''}
                    >
                        {item.icon}
                        {!sidebarCollapsed && <span className="font-semibold">{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Collapse Button */}
            <div className="p-4 border-t border-blue-500">
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
                >
                    {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    {!sidebarCollapsed && <span className="font-semibold">Collapse</span>}
                </button>
            </div>

            {/* Logout */}
            <div  onClick={handleLogout} className="p-4 border-t border-blue-500">
                <button className={`w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition ${
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