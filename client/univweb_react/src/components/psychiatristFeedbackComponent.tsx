import React, { useState } from 'react';
import { Star, Search, Filter, MessageSquare, User, Calendar, Eye, X, TrendingUp, AlertCircle, ThumbsUp } from 'lucide-react';

export default function PsychiatristFeedback() {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterRating, setFilterRating] = useState('all');
	const [filterMonth, setFilterMonth] = useState('all');
	const [selectedFeedback, setSelectedFeedback] = useState(null);
	const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);

	// Sample feedback data
	const [feedbackList] = useState([
			{
				id: 1,
				studentName: "John Kamau",
				studentAdmissionNum: "ADM12345",
				studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
				sessionDate: "2025-10-28",
				sessionType: "Individual Therapy",
				rating: 5,
				feedbackMessage: "Dr. Mwangi was incredibly helpful and understanding. The strategies she provided for managing anxiety have been working wonderfully. I felt comfortable opening up and she made me feel heard.",
				anonymity: false,
				sessionHelpful: "yes",
				wouldRecommend: "yes",
				specificPositives: "Great listening skills, practical advice, made me feel safe",
				areasOfImprovement: "None, session was perfect",
				submittedDate: "2025-10-30"
			},
			{
				id: 2,
				studentName: "Sarah Johnson",
				studentAdmissionNum: "ADM12346",
				studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
				sessionDate: "2025-10-22",
				sessionType: "Follow-up Session",
				rating: 4,
				feedbackMessage: "The follow-up session was helpful in addressing some of the concerns from the previous meeting. I appreciated the continuity of care.",
				anonymity: false,
				sessionHelpful: "yes",
				wouldRecommend: "yes",
				specificPositives: "Professional approach, knowledgeable about my case",
				areasOfImprovement: "Could have provided more written resources to take home",
				submittedDate: "2025-10-25"
			},
			{
				id: 3,
				studentName: "Anonymous Student",
				studentAdmissionNum: "ADM12347",
				studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
				sessionDate: "2025-10-15",
				sessionType: "Initial Consultation",
				rating: 3,
				feedbackMessage: "The session was informative but I felt rushed. Would have appreciated more time to discuss my concerns in depth.",
				anonymity: true,
				sessionHelpful: "maybe",
				wouldRecommend: "maybe",
				specificPositives: "Clear explanation of treatment options",
				areasOfImprovement: "More time allocation per session, better follow-up planning",
				submittedDate: "2025-10-18"
			},
			{
				id: 4,
				studentName: "Emily Davis",
				studentAdmissionNum: "ADM12348",
				studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
				sessionDate: "2025-10-08",
				sessionType: "Individual Therapy",
				rating: 5,
				feedbackMessage: "Exceptional care! Dr. Mwangi went above and beyond to help me through a difficult time. The techniques shared are life-changing.",
				anonymity: false,
				sessionHelpful: "yes",
				wouldRecommend: "yes",
				specificPositives: "Compassionate, empathetic, practical techniques, excellent communication",
				areasOfImprovement: "None",
				submittedDate: "2025-10-12"
			},
			{
				id: 5,
				studentName: "Michael Chen",
				studentAdmissionNum: "ADM12349",
				studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
				sessionDate: "2025-09-28",
				sessionType: "Medication Management",
				rating: 4,
				feedbackMessage: "Good discussion about medication adjustments. Clear explanation of side effects and benefits.",
				anonymity: false,
				sessionHelpful: "yes",
				wouldRecommend: "yes",
				specificPositives: "Thorough explanation, answered all questions",
				areasOfImprovement: "Could have provided more detail about long-term outcomes",
				submittedDate: "2025-10-02"
			},
			{
				id: 6,
				studentName: "Anonymous Student",
				studentAdmissionNum: "ADM12350",
				studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
				sessionDate: "2025-09-21",
				sessionType: "Individual Therapy",
				rating: 2,
				feedbackMessage: "While the psychiatrist was professional, I didn't feel a strong connection. Didn't feel like my specific concerns were fully addressed.",
				anonymity: true,
				sessionHelpful: "no",
				wouldRecommend: "no",
				specificPositives: "Professional demeanor",
				areasOfImprovement: "Better personalization of approach, more active listening",
				submittedDate: "2025-09-24"
			}
		]);

	// Calculate statistics
	// const averageRating:Number = (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1);
	const averageRating:Number = (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length);
	const totalFeedbacks = feedbackList.length;
	const recommendationRate = Math.round((feedbackList.filter(f => f.wouldRecommend === 'yes').length / totalFeedbacks) * 100);
	const helpfulRate = Math.round((feedbackList.filter(f => f.sessionHelpful === 'yes').length / totalFeedbacks) * 100);

	// Filter feedbacks
	const filteredFeedbacks = feedbackList.filter(feedback => {
		const matchesSearch = 
		feedback.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		feedback.studentAdmissionNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
		feedback.feedbackMessage.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesRating = filterRating === 'all' || feedback.rating === parseInt(filterRating);
		
		const feedbackMonth = feedback.submittedDate.substring(0, 7);
		const today = new Date();
		let currentMonth = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');
		let matchesMonth = true;
		
		if (filterMonth === 'current') {
		matchesMonth = feedbackMonth === currentMonth;
		} else if (filterMonth === 'last3') {
		const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
		const feedbackDate = new Date(feedback.submittedDate);
		matchesMonth = feedbackDate >= threeMonthsAgo;
		}
    
		return matchesSearch && matchesRating && matchesMonth;
	});

	const getRatingColor = (rating) => {
		if (rating === 5) return 'text-yellow-400';
		if (rating === 4) return 'text-yellow-400';
		if (rating === 3) return 'text-yellow-300';
		if (rating <= 2) return 'text-red-400';
		return 'text-gray-300';
	};

	const getRatingBgColor = (rating) => {
		if (rating === 5) return 'bg-green-100';
		if (rating === 4) return 'bg-yellow-100';
		if (rating === 3) return 'bg-blue-100';
		if (rating <= 2) return 'bg-red-100';
		return 'bg-gray-100';
	};

	const handleViewFeedback = (feedback) => {
		setSelectedFeedback(feedback);
		setShowFeedbackDetails(true);
	};

  return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Student Feedback</h1>
				<p className="text-gray-600">Review feedback from students after completed sessions</p>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-6">
				<div className="bg-white rounded-xl shadow-md p-6">
					<p className="text-gray-600 text-sm mb-2">Average Rating</p>
					<div className="flex items-center space-x-2">
					<p className="text-3xl font-bold text-gray-900">{String(averageRating)}</p>
					<div className="flex space-x-1">
						{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
						/>
						))}
					</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6">
					<p className="text-gray-600 text-sm mb-2">Total Feedback</p>
					<p className="text-3xl font-bold text-gray-900">{totalFeedbacks}</p>
					<p className="text-xs text-gray-500 mt-1">From completed sessions</p>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6">
					<p className="text-gray-600 text-sm mb-2">Would Recommend</p>
					<div className="flex items-center space-x-2">
					<p className="text-3xl font-bold text-green-600">{recommendationRate}%</p>
					<ThumbsUp className="w-5 h-5 text-green-600" />
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-md p-6">
					<p className="text-gray-600 text-sm mb-2">Found Helpful</p>
					<div className="flex items-center space-x-2">
					<p className="text-3xl font-bold text-blue-600">{helpfulRate}%</p>
					<TrendingUp className="w-5 h-5 text-blue-600" />
					</div>
				</div>
				</div>

				{/* Filters and Search */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6">
				<div className="grid md:grid-cols-3 gap-4">
					<div className="relative">
					<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search by student name or feedback content..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					/>
					</div>

					<div className="relative">
					<Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<select
						value={filterRating}
						onChange={(e) => setFilterRating(e.target.value)}
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
					>
						<option value="all">All Ratings</option>
						<option value="5">5 Stars</option>
						<option value="4">4 Stars</option>
						<option value="3">3 Stars</option>
						<option value="2">2 Stars</option>
						<option value="1">1 Star</option>
					</select>
					</div>

					<div className="relative">
					<Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<select
						value={filterMonth}
						onChange={(e) => setFilterMonth(e.target.value)}
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
					>
						<option value="all">All Time</option>
						<option value="current">Current Month</option>
						<option value="last3">Last 3 Months</option>
					</select>
					</div>
				</div>
				</div>

				{/* Feedback List */}
				<div className="space-y-4">
				{filteredFeedbacks.length > 0 ? (
					filteredFeedbacks.map((feedback) => (
					<div key={feedback.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
						<div className="flex items-start justify-between mb-4">
						<div className="flex items-start space-x-4 flex-1">
							<img
							src={feedback.studentAvatar}
							alt={feedback.studentName}
							className="w-12 h-12 rounded-full object-cover"
							/>
							<div className="flex-1 min-w-0">
							<div className="flex items-center space-x-2 mb-1">
								<h3 className="font-bold text-gray-900">
								{feedback.anonymity ? 'Anonymous Student' : feedback.studentName}
								</h3>
								{feedback.anonymity && (
								<span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">
									Anonymous
								</span>
								)}
							</div>
							<p className="text-sm text-gray-600 mb-1">
								{feedback.anonymity ? 'Admission: Hidden' : `Admission: ${feedback.studentAdmissionNum}`}
							</p>
							<p className="text-xs text-gray-500">
								Session: {feedback.sessionType} • {feedback.sessionDate}
							</p>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getRatingBgColor(feedback.rating)}`}>
							{[...Array(5)].map((_, i) => (
								<Star
								key={i}
								className={`w-4 h-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
								/>
							))}
							<span className="ml-1 font-bold text-gray-900">{feedback.rating}</span>
							</div>
						</div>
						</div>

						{/* Feedback Message Preview */}
						<p className="text-gray-700 mb-4 line-clamp-2">
						"{feedback.feedbackMessage}"
						</p>

						{/* Quick Indicators */}
						<div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200">
						<div className="flex items-center space-x-1 text-sm">
							{feedback.sessionHelpful === 'yes' ? (
							<span className="text-green-700 font-semibold flex items-center space-x-1">
								<ThumbsUp className="w-4 h-4" />
								<span>Found Helpful</span>
							</span>
							) : feedback.sessionHelpful === 'maybe' ? (
							<span className="text-yellow-700 font-semibold">Somewhat Helpful</span>
							) : (
							<span className="text-red-700 font-semibold">Not Helpful</span>
							)}
						</div>
						<div className="text-xs text-gray-500">
							{feedback.wouldRecommend === 'yes' 
							? 'Would recommend' 
							: feedback.wouldRecommend === 'maybe'
							? 'Maybe would recommend'
							: 'Would not recommend'}
						</div>
						<div className="text-xs text-gray-500">
							Submitted: {feedback.submittedDate}
						</div>
						</div>

						<button
						onClick={() => handleViewFeedback(feedback)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
						>
						View Full Feedback
						</button>
					</div>
					))
				) : (
					<div className="bg-white rounded-xl shadow-md p-12 text-center">
					<MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
					<p className="text-gray-600 text-lg">No feedback found</p>
					<p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
					</div>
				)}
				</div>
			</div>

			{/* Feedback Details Modal */}
			{showFeedbackDetails && selectedFeedback && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
				<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
					{/* Modal Header */}
					<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold">Feedback Details</h2>
					<button
						onClick={() => setShowFeedbackDetails(false)}
						className="p-2 hover:bg-blue-500 rounded-full transition"
					>
						<X className="w-6 h-6" />
					</button>
					</div>

					<div className="p-8">
					{/* Student Info */}
					<div className="mb-6 flex items-center space-x-4">
						<img
						src={selectedFeedback.studentAvatar}
						alt={selectedFeedback.studentName}
						className="w-16 h-16 rounded-full object-cover"
						/>
						<div>
						<h3 className="text-xl font-bold text-gray-900">
							{selectedFeedback.anonymity ? 'Anonymous Student' : selectedFeedback.studentName}
						</h3>
						<p className="text-gray-600">
							{selectedFeedback.anonymity ? 'Submission: Anonymous' : `Admission: ${selectedFeedback.studentAdmissionNum}`}
						</p>
						</div>
					</div>

					{/* Session Info */}
					<div className="bg-blue-50 rounded-lg p-4 mb-6">
						<h3 className="font-bold text-gray-900 mb-3">Session Information</h3>
						<div className="grid md:grid-cols-2 gap-4">
						<div>
							<p className="text-xs text-gray-600">Session Type</p>
							<p className="font-semibold text-gray-900">{selectedFeedback.sessionType}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Session Date</p>
							<p className="font-semibold text-gray-900">{selectedFeedback.sessionDate}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Feedback Submitted</p>
							<p className="font-semibold text-gray-900">{selectedFeedback.submittedDate}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Rating</p>
							<div className="flex items-center space-x-1 mt-1">
							{[...Array(5)].map((_, i) => (
								<Star
								key={i}
								className={`w-5 h-5 ${i < selectedFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
								/>
							))}
							<span className="ml-2 font-bold">{selectedFeedback.rating}/5</span>
							</div>
						</div>
						</div>
					</div>

					{/* Main Feedback */}
					<div className="mb-6">
						<h3 className="font-bold text-gray-900 mb-3">Feedback</h3>
						<div className="bg-gray-50 rounded-lg p-4">
						<p className="text-gray-700">{selectedFeedback.feedbackMessage}</p>
						</div>
					</div>

					{/* Session Evaluation */}
					<div className="grid md:grid-cols-2 gap-4 mb-6">
						<div className="bg-gray-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-2">Was the session helpful?</p>
						<p className="font-semibold text-gray-900 capitalize">
							{selectedFeedback.sessionHelpful === 'yes' 
							? '✓ Yes' 
							: selectedFeedback.sessionHelpful === 'maybe'
							? '~ Maybe'
							: '✗ No'}
						</p>
						</div>
						<div className="bg-gray-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-2">Would you recommend?</p>
						<p className="font-semibold text-gray-900 capitalize">
							{selectedFeedback.wouldRecommend === 'yes' 
							? '✓ Yes' 
							: selectedFeedback.wouldRecommend === 'maybe'
							? '~ Maybe'
							: '✗ No'}
						</p>
						</div>
					</div>

					{/* Specific Positives */}
					{selectedFeedback.specificPositives && (
						<div className="mb-6">
						<h3 className="font-bold text-gray-900 mb-3">What Went Well</h3>
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<p className="text-gray-700">{selectedFeedback.specificPositives}</p>
						</div>
						</div>
					)}

					{/* Areas for Improvement */}
					{selectedFeedback.areasOfImprovement && (
						<div className="mb-6">
						<h3 className="font-bold text-gray-900 mb-3">Areas for Improvement</h3>
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
							<p className="text-gray-700">{selectedFeedback.areasOfImprovement}</p>
						</div>
						</div>
					)}

					{/* Anonymity Info */}
					{selectedFeedback.anonymity && (
						<div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-start space-x-3">
						<AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
						<div className="text-sm text-gray-700">
							<p className="font-semibold mb-1">Anonymous Submission</p>
							<p>This feedback was submitted anonymously. Student details are not visible.</p>
						</div>
						</div>
					)}

					{/* Close Button */}
					<div className="flex space-x-4 pt-6 border-t border-gray-200">
						<button
						onClick={() => setShowFeedbackDetails(false)}
						className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
						>
						Close
						</button>
					</div>
					</div>
				</div>
				</div>
			)}
		</div>
  );
}