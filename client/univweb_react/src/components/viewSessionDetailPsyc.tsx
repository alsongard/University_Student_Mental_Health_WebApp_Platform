import { useEffect, useState } from 'react';
import React from 'react'

export default function  viewSessionDetailsPsyc(props:any)
{
    const [selectedSession, setSelectedSession] = useState({
            id:1,
            date:"",
            time:"",
            duration:0,
            type:"",
            mode:"",
            status:"",
            maxBookings:1,
            currentBookings:0
        });
    useEffect(()=>{
        setSelectedSession({
            id: 1,
            date: '2025-10-28',
            time: '10:00 AM',
            duration: 50,
            type: 'Individual Therapy',
            mode: 'In-Person',
            status: 'available',
            maxBookings: 1,
            currentBookings: 0
        })
    }, [])
    return (
        <div>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600">Date</p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">{selectedSession.date}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600">Time</p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">{selectedSession.time}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600">Session Type</p>
                    </div>
                    <p className="font-bold text-gray-900">{selectedSession.type}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <Video className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600">Mode</p>
                    </div>
                    <p className="font-bold text-gray-900">{selectedSession.mode}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Duration</p>
                    <p className="font-bold text-gray-900">{selectedSession.duration} minutes</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedSession.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                        {selectedSession.status}
                    </span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Bookings</p>
                    <p className="font-bold text-gray-900">
                        {selectedSession.currentBookings} / {selectedSession.maxBookings}
                    </p>
                    </div>
                </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                // onClick={() => handleEdit(selectedSession)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                Edit Session
                </button>
                <button
                // onClick={() => setView('list')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                Close
                </button>
            </div>
            </div>
        </div>
    )
}
