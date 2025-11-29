import { useState } from "react";
import { Search } from "lucide-react";
export default function StudentSessionComponent()
{
    const [selectedSession, setSelectedSession] = useState(null);
    
    // Sample upcoming sessions
    const upcomingSessions = [
        {
            id: 1,
            psychiatristName: "Dr. Sarah Mwangi",
            date: "2025-10-28",
            time: "10:00 AM",
            type: "Individual Therapy",
            status: "confirmed",
            mode: "In-Person"
        },
        {
            id: 2,
            psychiatristName: "Dr. James Ochieng",
            date: "2025-11-02",
            time: "2:00 PM",
            type: "Follow-up Session",
            status: "pending",
            mode: "Virtual"
        }
    ];
     const availableSessions = [
        {
        id: 101,
        psychiatristName: "Dr. Sarah Mwangi",
        specialization: "Anxiety & Depression",
        availableSlots: ["2025-10-30 9:00 AM", "2025-10-30 11:00 AM", "2025-10-31 2:00 PM"],
        mode: "Both"
        },
        {
        id: 102,
        psychiatristName: "Dr. Amina Hassan",
        specialization: "Relationship Issues",
        availableSlots: ["2025-10-29 10:00 AM", "2025-10-30 3:00 PM"],
        mode: "In-Person"
        },
        {
        id: 103,
        psychiatristName: "Dr. Peter Kamau",
        specialization: "ADHD & Learning Support",
        availableSlots: ["2025-10-31 9:00 AM", "2025-11-01 1:00 PM"],
        mode: "Virtual"
        }
    ];
    const router = "useRouter()"
    return (
        <section className='p-8 flex flex-col space-y-[50px] w-full'>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Available Sessions</h1>
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search psychiatrists..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {availableSessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{session.psychiatristName}</h3>
                                    <p className="text-blue-600 font-semibold">{session.specialization}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    Available
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Available Time Slots:</p>
                                <div className="space-y-2">
                                    {session.availableSlots.map((slot, index) => (
                                    <button
                                        key={index}
                                        // onClick={() => setSelectedSession({ ...session, selectedSlot: slot })} // WORK ON THESE
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-sm font-medium text-gray-700"
                                    >
                                        {slot}
                                    </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-sm text-gray-600">Mode: {session.mode}</span>
                                <button onClick={()=>{router.push(`/studentdashboard/booking/${session.id}`)}} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedSession && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Booking</h2>
                            <div className="space-y-3 mb-6">
                                <p><strong>Psychiatrist:</strong> {selectedSession.psychiatristName}</p>
                                <p><strong>Time Slot:</strong> {selectedSession.selectedSlot}</p>
                                <p><strong>Mode:</strong> {selectedSession.mode}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                    alert('Session booked successfully!');
                                    setSelectedSession(null);
                                    }}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* STUDENT BOOKED SESSIONS */}
            <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Booked Sessions</h1>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                    {availableSessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{session.psychiatristName}</h3>
                                    <p className="text-blue-600 font-semibold">{session.specialization}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    Available
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Booked Time Slots:</p>
                                <div className="space-y-2">
                                    {/* CHANGE THIS TO SHOW ONLY THE SELECTED SLOT */}
                                    {session.availableSlots.map((slot, index) => (
                                    <button
                                        key={index}
                                        // onClick={() => setSelectedSession({ ...session, selectedSlot: slot })} // WORK ON THESE
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-sm font-medium text-gray-700"
                                    >
                                        {slot}
                                    </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


            {/* STUDENT PREVIOUS SESSIONS: MAYBE */}
        </section>
    )
}