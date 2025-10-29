'use client';
import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Shield, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

export default function FeedbackForm()
{
	const [formData, setFormData] = useState({
		rating: 0,
		feedbackMessage: '',
		anonymity: true,
		sessionHelpful: '',
		wouldRecommend: '',
		areasOfImprovement: '',
		specificPositives: ''
	});

	const [hoverRating, setHoverRating] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	// This data would be fetched from localStorage or API based on bookingId
	const sessionData = {
		bookingId: 1,
		studentId: "STU12345",
		psychiatristId: 3,
		psychiatristName: "Dr. Sarah Mwangi",
		sessionDate: "2025-10-28",
		sessionType: "Individual Therapy"
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
		...prev,
		[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleRatingClick = (rating) => {
		setFormData(prev => ({ ...prev, rating }));
	};

	const handleSubmit = (e) => {
    e.preventDefault();
    
    const feedbackData = {
      bookingId: sessionData.bookingId,
      studentId: sessionData.studentId,
      psychiatristId: sessionData.psychiatristId,
      rating: formData.rating,
      feedbackMessage: formData.feedbackMessage,
      anonymity: formData.anonymity,
      sessionHelpful: formData.sessionHelpful,
      wouldRecommend: formData.wouldRecommend,
      areasOfImprovement: formData.areasOfImprovement,
      specificPositives: formData.specificPositives,
      submittedAt: new Date().toISOString()
    };

    console.log('Feedback Data:', feedbackData);
    setSubmitted(true);
	};

	const getRatingLabel = (rating) => {
		const labels = {
		1: 'Very Poor',
		2: 'Poor',
		3: 'Average',
		4: 'Good',
		5: 'Excellent'
		};
		return labels[rating] || '';
	};

	const isFormValid = () => {
		return formData.rating > 0 && 
			formData.feedbackMessage.length >= 20 && 
			formData.sessionHelpful !== '' && 
			formData.wouldRecommend !== '';
	};

	if (submitted) {
		return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
			<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<CheckCircle className="w-10 h-10 text-green-600" />
			</div>
			<h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
			<p className="text-gray-600 mb-6">
				Your feedback has been submitted successfully. Your input helps us improve our services 
				and provide better support to all students.
			</p>
			{formData.anonymity && (
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
				<Shield className="w-5 h-5 text-blue-600 mx-auto mb-2" />
				<p className="text-sm text-blue-800">
					Your feedback was submitted anonymously as requested.
				</p>
				</div>
			)}
			<button
				onClick={() => window.history.back()}
				className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
			>
				Back to Dashboard
			</button>
			</div>
		</div>
		);
	}

	return (
		<section className="min-h-screen w-full bg-gray-50 p-4 py-8">
			<div className="w-full">
				<div className="bg-white rounded-2xl shadow-lg p-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</h1>
						<p className="text-gray-600">
							Your feedback helps us improve our services and support your mental health journey
						</p>
					</div>

					{/* Session Information */}
					<div className="bg-blue-50 rounded-xl p-6 mb-8">
						<h2 className="font-bold text-gray-900 mb-3">Session Information</h2>
						<div className="space-y-2 text-sm">
							<p><strong>Psychiatrist:</strong> {sessionData.psychiatristName}</p>
							<p><strong>Session Date:</strong> {sessionData.sessionDate}</p>
							<p><strong>Session Type:</strong> {sessionData.sessionType}</p>
							<p><strong>Student ID:</strong> {sessionData.studentId}</p>
						</div>
					</div>

					<div className="space-y-8">
						{/* Rating Section */}
						<div>
							<label className="block text-lg font-bold text-gray-900 mb-3">
								Overall Session Rating *
							</label>
							<div className="flex items-center space-x-2 mb-2">
								{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									type="button"
									onClick={() => handleRatingClick(star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									className="focus:outline-none transition-transform hover:scale-110"
								>
									<Star
									className={`w-12 h-12 ${
										star <= (hoverRating || formData.rating)
										? 'fill-yellow-400 text-yellow-400'
										: 'text-gray-300'
									}`}
									/>
								</button>
								))}
							</div>
							{formData.rating > 0 && (
								<p className="text-sm font-semibold text-blue-600">
									{getRatingLabel(formData.rating)}
								</p>
							)}
							{formData.rating === 0 && (
								<p className="text-sm text-red-600">Please select a rating</p>
							)}
						</div>

						{/* Was Session Helpful */}
						<div>
							<label className="block text-sm font-bold text-gray-900 mb-3">
								Did you find this session helpful? *
							</label>
							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={() => setFormData(prev => ({ ...prev, sessionHelpful: 'yes' }))}
									className={`border-2 rounded-lg p-4 transition ${
										formData.sessionHelpful === 'yes'
										? 'border-green-600 bg-green-50'
										: 'border-gray-200 hover:border-green-600'
									}`}
								>
									<ThumbsUp className={`w-8 h-8 mx-auto mb-2 ${
										formData.sessionHelpful === 'yes' ? 'text-green-600' : 'text-gray-400'
									}`} />
									<p className="font-semibold text-gray-900">Yes</p>
								</button>

								<button
									type="button"
									onClick={() => setFormData(prev => ({ ...prev, sessionHelpful: 'no' }))}
									className={`border-2 rounded-lg p-4 transition ${
										formData.sessionHelpful === 'no'
										? 'border-red-600 bg-red-50'
										: 'border-gray-200 hover:border-red-600'
									}`}
								>
									<ThumbsDown className={`w-8 h-8 mx-auto mb-2 ${
										formData.sessionHelpful === 'no' ? 'text-red-600' : 'text-gray-400'
									}`} />
									<p className="font-semibold text-gray-900">No</p>
								</button>
							</div>
						</div>

						{/* Main Feedback Message */}
						<div>
							<label className="block text-sm font-bold text-gray-900 mb-2">
								<MessageSquare className="w-4 h-4 inline mr-2" />
								Your Feedback *
							</label>
							<textarea
								name="feedbackMessage"
								value={formData.feedbackMessage}
								onChange={handleChange}
								rows={5}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								placeholder="Please share your thoughts about the session. What worked well? What could be improved?"
							/>
							<p className="text-xs text-gray-500 mt-1">
								Minimum 20 characters ({formData.feedbackMessage.length}/20)
							</p>
						</div>

						{/* What went well */}
						<div>
							<label className="block text-sm font-bold text-gray-900 mb-2">
								What did you find most helpful?
							</label>
							<textarea
								name="specificPositives"
								value={formData.specificPositives}
								onChange={handleChange}
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								placeholder="E.g., The breathing exercises, the psychiatrist's listening skills, specific advice given..."
							/>
						</div>

						{/* Areas of Improvement */}
						<div>
							<label className="block text-sm font-bold text-gray-900 mb-2">
								What could be improved?
							</label>
							<textarea
								name="areasOfImprovement"
								value={formData.areasOfImprovement}
								onChange={handleChange}
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								placeholder="E.g., More time needed, clearer explanations, different approach..."
							/>
						</div>

						{/* Would Recommend */}
						<div>
							<label className="block text-sm font-bold text-gray-900 mb-3">
								Would you recommend this psychiatrist to other students? *
							</label>
							<div className="space-y-2">
								<label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
								formData.wouldRecommend === 'yes'
									? 'border-blue-600 bg-blue-50'
									: 'border-gray-200 hover:border-blue-600'
								}`}>
									<input
										type="radio"
										name="wouldRecommend"
										value="yes"
										checked={formData.wouldRecommend === 'yes'}
										onChange={handleChange}
										className="w-4 h-4 text-blue-600"
									/>
									<span className="ml-3 font-semibold text-gray-900">Yes, definitely</span>
								</label>

								<label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
								formData.wouldRecommend === 'maybe'
									? 'border-blue-600 bg-blue-50'
									: 'border-gray-200 hover:border-blue-600'
								}`}>
									<input
										type="radio"
										name="wouldRecommend"
										value="maybe"
										checked={formData.wouldRecommend === 'maybe'}
										onChange={handleChange}
										className="w-4 h-4 text-blue-600"
									/>
									<span className="ml-3 font-semibold text-gray-900">Maybe</span>
								</label>

								<label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
								formData.wouldRecommend === 'no'
									? 'border-blue-600 bg-blue-50'
									: 'border-gray-200 hover:border-blue-600'
								}`}>
									<input
										type="radio"
										name="wouldRecommend"
										value="no"
										checked={formData.wouldRecommend === 'no'}
										onChange={handleChange}
										className="w-4 h-4 text-blue-600"
									/>
									<span className="ml-3 font-semibold text-gray-900">No</span>
								</label>
							</div>
						</div>

						{/* Anonymity Option */}
						<div className="bg-gray-50 rounded-xl p-6">
							<div className="flex items-start space-x-3">
								<input
									type="checkbox"
									name="anonymity"
									id="anonymity"
									checked={formData.anonymity}
									onChange={handleChange}
									className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
								/>
								<div className="flex-1">
									<label htmlFor="anonymity" className="font-bold text-gray-900 cursor-pointer flex items-center">
										<Shield className="w-4 h-4 mr-2" />
										Submit feedback anonymously
									</label>
									<p className="text-sm text-gray-600 mt-1">
										If checked, your name and student ID will not be shared with the psychiatrist. 
										However, the feedback will still be recorded for quality improvement purposes.
									</p>
								</div>
							</div>
						</div>

						{/* Important Notice */}
						<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
							<div className="flex items-start">
								<AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
								<div className="text-sm text-yellow-800">
									<p className="font-semibold mb-1">Please Note</p>
									<p>
										Your feedback is valuable and will be used to improve our services. 
										Be honest and constructive in your responses. This is not a medical evaluation 
										or complaint form. For urgent concerns, please contact MindBridge support directly.
									</p>
								</div>
							</div>
						</div>

						{/* Submit Buttons */}
						<div className="flex space-x-4 pt-6">
							<button
								type="button"
								onClick={() => window.history.back()}
								className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSubmit}
								disabled={!isFormValid()}
								className={`flex-1 px-6 py-3 font-semibold rounded-lg transition ${
								isFormValid()
									? 'bg-blue-600 text-white hover:bg-blue-700'
									: 'bg-gray-300 text-gray-500 cursor-not-allowed'
								}`}
							>
								Submit Feedback
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}