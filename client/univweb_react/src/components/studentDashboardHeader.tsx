import { Bell , Home, Calendar, MessageSquare, FileText, User} from "lucide-react";
import { useState } from "react";
export default function StudentDashboardHeader()
{
    const studentData = {
        name: "John Kamau",
        admissionNumber: "ADM12345",
        email: "john.kamau@zetech.ac.ke",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    };
      const navigationItems = [
        { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Overview' },
        { id: 'sessions', icon: <Calendar className="w-5 h-5" />, label: 'View Sessions' },
        { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
        { id: 'feedback', icon: <FileText className="w-5 h-5" />, label: 'Feedback' },
        { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' }
    ];
    
    return (
        <div className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-8 py-4 flex items-center justify-end">
                <div className="flex  items-center space-x-8">
                    <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center space-x-3">
                        <img
                            src={studentData.avatar}
                            alt={studentData.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                        />
                        
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">{studentData.name}</p>
                            <p className="text-xs text-gray-600">{studentData.admissionNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 *         
 */

/**       <div className="bg-white shadow-sm absolute w-1/2 mr-0 top-0  right-0 z-10">
            <div className="px-8 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                    <p>{pathName.toString()}</p>
                </h2>
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center space-x-3">
                        <img
                            src={studentData.avatar}
                            alt={studentData.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                        />
                        {/* {!sidebarCollapsed && (
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">{studentData.name}</p>
                            <p className="text-xs text-gray-600">{studentData.admissionNumber}</p>
                        </div>
                        )} 
                    </div>
                </div>
            </div>
        </div>
 */