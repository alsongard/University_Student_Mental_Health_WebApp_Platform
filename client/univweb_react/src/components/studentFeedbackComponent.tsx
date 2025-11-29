

export default function StudentFeedBack() 
{
    // Sample feedbacks : ARRAY
    const feedbacks = [
        {
            id: 1,
            sessionDate: "2025-10-15",
            psychiatristName: "Dr. Sarah Mwangi",
            rating: 5,
            comment: "Very helpful session. Dr. Mwangi was understanding and provided practical strategies.",
            response: "Thank you for your feedback! I'm glad our session was beneficial."
        },
        {
            id: 2,
            sessionDate: "2025-10-10",
            psychiatristName: "Dr. James Ochieng",
            rating: 4,
            comment: "Good session, but I wish we had more time to discuss everything.",
            response: null
        }
    ];
    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Session Feedback</h1>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            New Feedback
            </button>
        </div>

        <div className="space-y-4">
            {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-bold text-gray-900">{feedback.psychiatristName}</h3>
                    <p className="text-sm text-gray-600">Session Date: {feedback.sessionDate}</p>
                </div>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-gray-700">{feedback.comment}</p>
                </div>

                {feedback.response && (
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Psychiatrist Response:</p>
                    <p className="text-gray-700">{feedback.response}</p>
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    )
    }