import React, { useState } from 'react';
import { User, Phone, MapPin, AlertCircle, BookOpen, Calendar, Users } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentDetailsRegistration() 
{
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);
	const apiURL = import.meta.env.VITE_API_URL;
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const [formData, setFormData] = useState({
		studentId: '',
		studentName: '',
		studentAge: '',
		gender: '',
		phoneNumber: '',
		course: '',
		yearOfStudy: '',
		address: '',
		emergencyContact: {
			name: '',
			phoneNumber: '',
			relationship: ''
		},
		dateofBirth: ''
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		
		if (name.startsWith('emergency_')) {
		const field = name.replace('emergency_', '');
		setFormData({
			...formData,
			emergencyContact: {
			...formData.emergencyContact,
			[field]: value
			}
		});
		} else {
		setFormData({
			...formData,
			[name]: value
		});
		}
	};

	const validate = () => {
		const newErrors = {}
		if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
		if (!formData.studentAge) newErrors.studentAge = 'Age is required';
		if (!formData.gender) newErrors.gender = 'Gender is required';
		if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
		if (!formData.course.trim()) newErrors.course = 'Course is required';
		if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
		if (!formData.address.trim()) newErrors.address = 'Address is required';
		if (!formData.emergencyContact.name.trim()) newErrors.emergencyName = 'Emergency contact name is required';
		if (!formData.emergencyContact.phoneNumber.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required';
		if (!formData.emergencyContact.relationship.trim()) newErrors.emergencyRelationship = 'Relationship is required';
		if (!formData.dateofBirth) newErrors.dateofBirth = 'Date of birth is required';
		setErrors(newErrors);
		console.log('New Errors:');
		console.log(newErrors)
		return Object.keys(newErrors).length === 0;
	};
	const [successMessage, setSuccessMessage] = useState('');



	const handleImageSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('files', selectedFile);
        console.log("formData");
        console.log(formData)
        try 
		{
			// https://university-student-psychiatrist.onrender.com
            // const response = await axios.post("http://localhost:5000/api/uploadFile", formData, {
            const response = await axios.post(`${apiURL}/api/uploadFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
                withCredentials:true
            })
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log('Event Running');
		try
		{
			if (validate()) 
			{	
				// const response = await axios.post("http://localhost:5000/api/studentDetails/createDetails/", {
				const response = await axios.post(`${apiURL}/api/studentDetails/createDetails/`, {
					studentName: formData.studentName,
					studentAge: formData.studentAge, 
					gender: formData.gender,
					phoneNumber: formData.phoneNumber,
					course: formData.course,
					yearOfStudy: formData.yearOfStudy,
					address: formData.address,
					emergencyContact: {
						name: formData.emergencyContact.name,
						phoneNumber: formData.emergencyContact.phoneNumber,
						relationship: formData.emergencyContact.relationship
					},
					dateofBirth:formData.dateofBirth,
				}, {withCredentials:true});

				if (response.data.success)
				{
					console.log('this is authToken:');
					console.log(response.data.data.authToken);
					const token = response.data.data.authToken;
					localStorage.setItem('authToken', token);

					setSuccessMessage('Student details created successfully!');

					setInterval(()=>{
						setSuccessMessage('');
						navigate('/studentdashboard');
					}, 6000);
				}
				console.log('Form submitted:', formData);
				setInterval(()=>{

					setFormData({
						studentId: '',
						studentName: '',
						studentAge: '',
						gender: '',
						phoneNumber: '',
						course: '',
						yearOfStudy: '',
						address: '',
						emergencyContact: {
							name: '',
							phoneNumber: '',
							relationship: ''
						},
						dateofBirth: ''
				});
				setErrors({});
				}, 6000);
				// Reset form	
			}
		}
		catch(err)
		{
			console.log('Error submitting form:', err);
			alert('Error submitting form. Please try again.');
		}
	};

	const handleReset = () => {
		setFormData({
		studentId: '',
		studentName: '',
		studentAge: '',
		gender: '',
		phoneNumber: '',
		course: '',
		yearOfStudy: '',
		address: '',
		emergencyContact: {
			name: '',
			phoneNumber: '',
			relationship: ''
			},
		dateofBirth: ''
		});
		setErrors({});
	};

  	return (
		<div className="min-h-screen bg-gradient-to-br dark:from-slate-800 from-blue-50 via-indigo-50  to-purple-50 dark:via-slate-800 dark:to-slate-800 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-3">Student Registration</h1>
					<p className="text-gray-600 dark:text-white">Register for MindBridge Mental Health Services</p>
				</div>

				{/* Form Card */}
				<div className="bg-white dark:bg-slate-700 rounded-3xl shadow-xl p-8">
					{/* Personal Information Section */}
					<div className="mb-8">
						<div className="flex items-center gap-2 mb-6">
							<User className="w-6 h-6 dark:text-white text-blue-600" />
							<h2 className="text-2xl font-bold dark:text-white text-gray-800">Personal Information</h2>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

							{/* Student Name */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Full Name 
									<span className="text-red-500 dark:text-white"> *</span>
								</label>
								<input
									type="text"
									name="studentName"
									value={formData.studentName}
									onChange={handleChange}
									className={`w-full dark:text-white px-4 py-3 rounded-xl border-2 ${
										errors.studentName ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
									placeholder="Enter full name"
								/>
								{
									errors.studentName && (
										<p className="text-red-500 text-xs flex items-center gap-1">
											<AlertCircle className="w-3 h-3" />
											{errors.studentName}
										</p>
									)
								}
							</div>

							{/* Age */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Age 
									<span className="text-red-500 dark:text-white "> *</span>
								</label>
								<input
									type="number"
									name="studentAge"
									value={formData.studentAge}
									onChange={handleChange}
									min="16"
									max="100"
									className={`w-full px-4 dark:text-white py-3 rounded-xl border-2 ${
										errors.studentAge ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
									placeholder="Enter age"
								/>
								{
									errors.studentAge && 
									(
										<p className="text-red-500 text-xs flex items-center gap-1">
											<AlertCircle className="w-3 h-3" />
											{errors.studentAge}
										</p>
									)
								}
							</div>

							{/* Gender */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Gender 
									<span className="text-red-500 dark:text-white">*</span>
								</label>
								<select
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									className={`w-full px-4 py-3 dark:text-white rounded-xl border-2 ${
										errors.gender ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
								>
									<option value="">Select gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
									<option value="Prefer not to say">Prefer not to say</option>
								</select>
								{errors.gender && (
								<p className="text-red-500 text-xs flex items-center gap-1">
									<AlertCircle className="w-3 h-3" />
									{errors.gender}
								</p>
								)}
							</div>

							{/* Phone Number */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Phone Number 
									<span className="text-red-500 dark:text-white"> *</span>
								</label>
								<div className="relative">
									<Phone className="absolute dark:text-white left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="tel"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										className={`w-full dark:text-white pl-12 pr-4 py-3 rounded-xl border-2 ${
										errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
										} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
										placeholder="Enter phone number"
									/>
								</div>
								{errors.phoneNumber && (
								<p className="text-red-500 text-xs flex items-center gap-1">
									<AlertCircle className="w-3 h-3" />
									{errors.phoneNumber}
								</p>
								)}
							</div>

							{/* Date of Birth */}
							<div className='space-y-2'>
								<label className="block text-sm font-semibold dark:text-white text-gray-700">
									Date of Birth 
									<span className="text-red-500 dark:text-white"> *</span>
								</label>
								<input 
									type='date'
									value={formData.dateofBirth}
									name='dateofBirth'
									onChange={handleChange}
									className={`w-full px-4 py-3 dark:text-white rounded-xl border-2 ${
										errors.dateofBirth ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
								/>
								{
									errors.dateofBirth && (
									<p className="text-red-500 text-xs flex items-center gap-1">
										<AlertCircle className="w-3 h-3" />
										{errors.dateofBirth}
									</p>
									)
								}
							</div>
						</div>
					</div>

					{/* Academic Information Section */}
					<div className="mb-8">
						<div className="flex items-center gap-2 mb-6">
							<BookOpen className="w-6 h-6 text-indigo-600" />
							<h2 className="text-2xl dark:text-white font-bold text-gray-800">Academic Information</h2>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Course */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Course 
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="course"
									value={formData.course}
									onChange={handleChange}
									className={`w-full px-4 py-3 dark:text-white rounded-xl border-2 ${
										errors.course ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
									placeholder="e.g., Computer Science"
								/>
								{
									errors.course && (
									<p className="text-red-500 text-xs flex items-center gap-1">
										<AlertCircle className="w-3 h-3" />
										{errors.course}
									</p>
									)
								}
							</div>

							{/* Year of Study */}
							<div className="space-y-2">
								<label className="block text-sm dark:text-white font-semibold text-gray-700">
									Year of Study 
									<span className="text-red-500 dark:text-white"> *</span>
								</label>
								<div className="relative">
									<Calendar className="absolute dark:text-white left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<select
										name="yearOfStudy"
										value={formData.yearOfStudy}
										onChange={handleChange}
										className={`w-full dark:text-white pl-12 pr-4 py-3 rounded-xl border-2 ${
										errors.yearOfStudy ? 'border-red-300' : 'border-gray-300'
										} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
									>
										<option value="">Select year</option>
										<option value="1">Year 1</option>
										<option value="2">Year 2</option>
										<option value="3">Year 3</option>
										<option value="4">Year 4</option>
										<option value="5">Year 5+</option>
									</select>
								</div>
								{
									errors.yearOfStudy && (
									<p className="text-red-500 text-xs flex items-center gap-1">
										<AlertCircle className="w-3 h-3" />
										{errors.yearOfStudy}
									</p>
									)
								}
							</div>

							{/* Address */}
							<div className="space-y-2 md:col-span-2">
								<label className="block text-sm font-semibold dark:text-white text-gray-700">
									Address 
									<span className="text-red-500 dark:text-white"> *</span>
								</label>
								<div className="relative">
									<MapPin className="absolute dark:text-white left-4 top-4 text-gray-400 w-5 h-5" />
								<textarea
									name="address"
									value={formData.address}
									onChange={handleChange}
									rows="3"
									className={`w-full pl-12 dark:text-white pr-4 py-3 rounded-xl border-2 ${
									errors.address ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none`}
									placeholder="Enter full address"
								/>
								</div>
								{
									errors.address && (
									<p className="text-red-500 text-xs flex items-center gap-1">
										<AlertCircle className="w-3 h-3" />
										{errors.address}
									</p>
									)
								}
							</div>

						</div>
					</div>

					{/* Emergency Contact Section */}
					<div className="mb-8">
						<div className="flex items-center gap-2 mb-6">
							<Users className="w-6 h-6 dark:text-white text-purple-600" />
							<h2 className="text-2xl font-bold text-gray-800 dark:text-white">Emergency Contact</h2>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Emergency Contact Name */}
						<div className="space-y-2">
							<label className="block text-sm dark:text-white font-semibold text-gray-700">
								Contact Name 
								<span className="dark:text-white text-red-500"> *</span>
							</label>
							<input
								type="text"
								name="emergency_name"
								value={formData.emergencyContact.name}
								onChange={handleChange}
								className={`w-full px-4 py-3 dark:text-white rounded-xl border-2 ${
									errors.emergencyName ? 'border-red-300' : 'border-gray-300'
								} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
								placeholder="Enter contact name"
							/>
							{
								errors.emergencyName && (
								<p className="text-red-500 text-xs flex items-center gap-1">
									<AlertCircle className="w-3 h-3" />
									{errors.emergencyName}
								</p>
							)
							}
						</div>

						{/* Emergency Contact Phone */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold dark:text-white text-gray-700">
								Contact Phone 
								<span className="text-red-500 dark:text-white"> *</span>
							</label>
							<div className="relative">
								<Phone className="absolute dark:text-white left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="tel"
									name="emergency_phoneNumber"
									value={formData.emergencyContact.phoneNumber}
									onChange={handleChange}
									className={`w-full pl-12 dark:text-white pr-4 py-3 rounded-xl border-2 ${
									errors.emergencyPhone ? 'border-red-300' : 'border-gray-300'
									} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
									placeholder="Enter contact phone"
								/>
							</div>
							{errors.emergencyPhone && (
							<p className="text-red-500 text-xs flex items-center gap-1">
								<AlertCircle className="w-3 h-3" />
								{errors.emergencyPhone}
							</p>
							)}
						</div>

						{/* Relationship */}
						<div className="space-y-2 md:col-span-2">
							<label className="block dark:text-white text-sm font-semibold text-gray-700">
								Relationship 
								<span className="text-red-500 dark:text-white"> *</span>
							</label>
							<select
								name="emergency_relationship"
								value={formData.emergencyContact.relationship}
								onChange={handleChange}
								className={`w-full px-4 py-3 dark:text-white rounded-xl border-2 ${
									errors.emergencyRelationship ? 'border-red-300' : 'border-gray-300'
								} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
							>
								<option value="">Select relationship</option>
								<option value="Parent">Parent</option>
								<option value="Guardian">Guardian</option>
								<option value="Sibling">Sibling</option>
								<option value="Spouse">Spouse</option>
								<option value="Friend">Friend</option>
								<option value="Other">Other</option>
							</select>
							{errors.emergencyRelationship && (
							<p className="text-red-500 text-xs flex items-center gap-1">
								<AlertCircle className="w-3 h-3" />
								{errors.emergencyRelationship}
							</p>
							)}
						</div>
						</div>
					</div>

					<div className="mb-8 border-gray-300 border-2 p-3 rounded-2xl">
						<form onSubmit={handleImageSubmit}>
							<input type="file" className="text-white" multiple={false} onChange={handleFileChange} />
							<button className="text-white" type="submit">Upload</button>
						</form>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-4">
						<button
							onClick={handleSubmit}
							className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl text-lg"
						>
							Register Student
						</button>
						<button
							onClick={handleReset}
							className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
						>
							Reset
						</button>
					</div>
					{
						successMessage &&
						<p className='bg-green-700 py-3 px-2 rounded-md'>Successfully created your student details?</p>
					}
				</div>
			</div>
		</div>
  	);
}