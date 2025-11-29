    // RENDERPROFILE
export default function  StudentProfile()
{
    // Sample student data
    const studentData = {
        name: "John Kamau",
        admissionNumber: "ADM12345",
        email: "john.kamau@zetech.ac.ke",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    };
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center space-x-6 mb-8">
                <img
                    src={studentData.avatar}
                    alt={studentData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
                    <p className="text-gray-600">{studentData.admissionNumber}</p>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
                    Change Photo
                    </button>
                </div>
                </div>

                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                    type="text"
                    value={studentData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                    type="email"
                    value={studentData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Admission Number</label>
                    <input
                    type="text"
                    value={studentData.admissionNumber}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="pt-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Save Changes
                    </button>
                </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Update Password
                </button>
                </div>
            </div>
        </div>
    )
}