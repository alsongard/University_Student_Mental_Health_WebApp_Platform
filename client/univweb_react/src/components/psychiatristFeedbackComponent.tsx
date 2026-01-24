import React, { useState, useCallback, useEffect} from 'react';
import { Star, Search, Filter, MessageSquare, User, Calendar, Eye, X, TrendingUp, AlertCircle, ThumbsUp } from 'lucide-react';
import axios from 'axios';

export default function PsychiatristFeedback(props)
{
	const {refreshView} = props;
	const apiURL = import.meta.env.VITE_API_URL;
	const [searchQuery, setSearchQuery] = useState('');
	const [filterRating, setFilterRating] = useState('all');
	const [filterMonth, setFilterMonth] = useState('all');
	const [selectedFeedback, setSelectedFeedback] = useState(null);
	const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);



	const [myCustomFeedBack, setMyCustomFeedBack] = useState([]);
	const getStudentFeedBack = useCallback(async ()=>{
		const response = await axios.get(`${apiURL}/api/psychiatristSession/getPsychFeedback`, {withCredentials:true});
		if (response.data.success)
		{
			//perform something
			console.log('response.data.data');
			// console.log(response.data.data);
			setMyCustomFeedBack(response.data.data);
		}
	}, []);

	useEffect(()=>{
		console.log('run on feedback');
		getStudentFeedBack();
	}, [refreshView.feedback])
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
			}
		]);

	// Calculate statistics
	// const averageRating:Number = (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1);
	const averageRating:Number = (myCustomFeedBack.reduce((sum, f) => sum + f.rating, 0) / myCustomFeedBack.length);
	const totalFeedbacks = myCustomFeedBack.length;
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
	<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Feedback</h1>
				<p className="text-gray-600 dark:text-gray-400">Review feedback from students after completed sessions</p>
			</div>

			{/* Stats Cards */}
			<div className="grid md:grid-cols-4 gap-6 mb-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
					<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Average Rating</p>
					<div className="flex items-center space-x-2">
						<p className="text-3xl font-bold text-gray-900 dark:text-white">{String(averageRating)}</p>
						<div className="flex space-x-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
					<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Feedback</p>
					<p className="text-3xl font-bold text-gray-900 dark:text-white">{totalFeedbacks}</p>
					<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">From completed sessions</p>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
					<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Would Recommend</p>
					<div className="flex items-center space-x-2">
						<p className="text-3xl font-bold text-green-600 dark:text-green-500">{recommendationRate}%</p>
						<ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-500" />
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
					<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Found Helpful</p>
					<div className="flex items-center space-x-2">
						<p className="text-3xl font-bold text-blue-600 dark:text-blue-500">{helpfulRate}%</p>
						<TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-500" />
					</div>
				</div>
			</div>

			{/* Filters and Search */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 mb-6">
				<div className="grid md:grid-cols-3 gap-4">
					<div className="relative">
						<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
						<input
							type="text"
							placeholder="Search by student name or feedback content..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div className="relative">
						<Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
						<select
							value={filterRating}
							onChange={(e) => setFilterRating(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent appearance-none"
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
						<Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
						<select
							value={filterMonth}
							onChange={(e) => setFilterMonth(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent appearance-none"
						>
							<option value="all">All Time</option>
							<option value="current">Current Month</option>
							<option value="last3">Last 3 Months</option>
						</select>
					</div>
				</div>
			</div>
			{/* Feedback List */}
			<div className="space-y-4 ">
				{
					myCustomFeedBack.length > 0 ?
					(
						myCustomFeedBack.map((feedBackItem)=>
							<div key={feedBackItem._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300">
								{/* Header Section - Anonymity & Rating */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
									{/* Anonymity Badge */}
									<div className="flex items-center gap-2">
										{feedBackItem.anonymity ? (
											<div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
												<span className="text-sm font-semibold">Anonymous</span>
											</div>
										) : (
											<div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												<span className="text-sm font-semibold">Verified</span>
											</div>
										)}
									</div>

									{/* Star Rating */}
									<div className="flex items-center gap-1">
										{[1, 2, 3, 4, 5].map((star) => (
											<svg
												key={star}
												className={`w-5 h-5 sm:w-6 sm:h-6 ${
													star <= feedBackItem.rating
														? 'text-yellow-400 dark:text-yellow-500 fill-current'
														: 'text-gray-300 dark:text-gray-600'
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
												/>
											</svg>
										))}
										<span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
											{feedBackItem.rating}/5
										</span>
									</div>
								</div>

								{/* Feedback Message */}
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
										{feedBackItem.feedbackMessage}
									</p>
								</div>
							</div>
						)
					)
					:
					(
						<div className="bg-white rounded-xl shadow-md p-12 text-center">
							<MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<p className="text-gray-600 text-lg">No feedback found</p>
							<p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
						</div>
					)
				}
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