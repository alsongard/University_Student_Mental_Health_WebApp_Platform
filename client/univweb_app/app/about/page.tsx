import React from 'react';
import { Heart, Shield, Users, Target, Award, Building2, Handshake, BookOpen, Phone, Mail, MapPin } from 'lucide-react';

export default function AboutPage() {
	const team = [
		{
		name: "Dr. Sarah Mwangi",
		title: "Lead University Psychiatrist",
		qualification: "MD, MRCPsych",
		experience: "12 years",
		specialization: "Anxiety, Depression, Academic Stress",
		image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
		},
		{
		name: "Dr. James Ochieng",
		title: "Clinical Psychologist",
		qualification: "PhD in Clinical Psychology",
		experience: "8 years",
		specialization: "Student Wellbeing, Trauma Recovery",
		image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
		},
		{
		name: "Dr. Amina Hassan",
		title: "Counseling Psychiatrist",
		qualification: "MD, Dip. Psychiatry",
		experience: "10 years",
		specialization: "Relationship Issues, Self-Esteem",
		image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
		},
		{
		name: "Dr. Peter Kamau",
		title: "Student Mental Health Specialist",
		qualification: "MD, MSc in Mental Health",
		experience: "6 years",
		specialization: "Substance Use, ADHD, Learning Support",
		image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
		}
	];

	const values = [
	{
		icon: <Shield className="w-12 h-12" />,
		title: "Confidentiality First",
		description: "Your privacy is paramount. All sessions are protected under medical confidentiality laws and university privacy policies."
	},
	{
		icon: <Heart className="w-12 h-12" />,
		title: "Student-Centered Care",
		description: "We understand the unique pressures of university life and tailor our approach to support your academic and personal growth."
	},
	{
		icon: <Users className="w-12 h-12" />,
		title: "Inclusive Support",
		description: "We provide culturally sensitive, non-judgmental care that respects the diversity of the Zetech community."
	},
	{
		icon: <Target className="w-12 h-12" />,
		title: "Accessible Care",
		description: "Easy booking, flexible scheduling, and multiple support options ensure help is always within reach."
	}
	];

	const partners = [
		{
		icon: <Building2 className="w-8 h-8" />,
		name: "Student Affairs Department",
		description: "Collaborative support for academic accommodations and student advocacy"
		},
		{
		icon: <Heart className="w-8 h-8" />,
		name: "University Health Services",
		description: "Integrated healthcare approach for holistic student wellness"
		},
		{
		icon: <BookOpen className="w-8 h-8" />,
		name: "Academic Support Center",
		description: "Coordinated assistance for students balancing mental health and academics"
		},
		{
		icon: <Handshake className="w-8 h-8" />,
		name: "Peer Support Network",
		description: "Student-led initiatives working alongside professional services"
		}
	];

	const privacyPoints = [
		"All sessions are completely confidential and protected by medical privacy laws",
		"Your academic records remain separate from your mental health records",
		"Information is only shared with your consent, except in rare cases of imminent danger",
		"Digital communications are encrypted and stored securely",
		"You control who has access to your treatment information",
		"Faculty and staff cannot access your mental health records without permission"
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h1 className="text-5xl font-bold mb-6">About MindBridge</h1>
				<p className="text-xl text-blue-100 max-w-3xl mx-auto">
				Supporting Zetech University students on their mental health journey with professional, 
				confidential, and compassionate care
				</p>
			</div>
			</section>

			{/* Zetech's Commitment */}
			<section className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<img 
					src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop" 
					alt="Zetech University Campus"
					className="rounded-2xl shadow-xl"
					/>
				</div>
				<div>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
					Zetech's Commitment to Student Wellbeing
					</h2>
					<p className="text-gray-700 text-lg mb-4">
					At Zetech University, we believe that academic excellence goes hand-in-hand with mental 
					and emotional wellbeing. We recognize that university life brings unique challenges—from 
					academic pressure and financial stress to social adjustments and future uncertainties.
					</p>
					<p className="text-gray-700 text-lg mb-4">
					MindBridge was established as part of Zetech's comprehensive student support framework, 
					ensuring that every student has access to professional mental health care when they need it most.
					</p>
					<p className="text-gray-700 text-lg">
					Our commitment extends beyond treatment—we're dedicated to creating a campus culture where 
					mental health is prioritized, stigma is eliminated, and seeking help is seen as a sign of strength.
					</p>
				</div>
				</div>
			</div>
			</section>

			{/* Mission Statement */}
			<section className="py-16 bg-blue-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
				<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
				<p className="text-xl text-gray-700 leading-relaxed">
				To provide accessible, professional, and confidential mental health support specifically 
				tailored to the needs of Zetech University students. We exist to ensure that no student 
				faces their mental health challenges alone, and that seeking help is as simple and 
				stigma-free as possible. Through MindBridge, we aim to empower students to thrive 
				academically, socially, and personally.
				</p>
			</div>
			</section>

			{/* Core Values */}
			<section className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{values.map((value, index) => (
					<div key={index} className="text-center">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4">
						{value.icon}
					</div>
					<h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
					<p className="text-gray-600">{value.description}</p>
					</div>
				))}
				</div>
			</div>
			</section>

			{/* Team Section */}
			<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet Our Professional Team</h2>
				<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
				Our psychiatrists and psychologists are fully qualified professionals with extensive experience 
				in student mental health. All team members are affiliated with Zetech University and understand 
				the unique context of student life.
				</p>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{team.map((member, index) => (
					<div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
					<img 
						src={member.image} 
						alt={member.name}
						className="w-full h-64 object-cover"
					/>
					<div className="p-6">
						<h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
						<p className="text-blue-600 font-semibold mb-2">{member.title}</p>
						<div className="space-y-1 text-sm text-gray-600 mb-3">
						<p><strong>Qualification:</strong> {member.qualification}</p>
						<p><strong>Experience:</strong> {member.experience}</p>
						</div>
						<p className="text-sm text-gray-700">
						<strong>Specializes in:</strong> {member.specialization}
						</p>
					</div>
					</div>
				))}
				</div>
				<div className="mt-8 bg-blue-100 rounded-xl p-6">
				<p className="text-center text-gray-700">
					<strong>University Affiliation:</strong> All our mental health professionals are licensed, 
					registered with the Kenya Medical Practitioners and Dentists Council, and employed directly 
					by Zetech University to serve the student community.
				</p>
				</div>
			</div>
			</section>

			{/* Confidentiality Section */}
			<section className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
				<div className="text-center mb-12">
					<Shield className="w-20 h-20 mx-auto mb-6" />
					<h2 className="text-3xl font-bold mb-4">Your Privacy is Protected</h2>
					<p className="text-xl text-blue-100 max-w-3xl mx-auto">
					We understand that confidentiality is crucial when seeking mental health support. 
					Here's our commitment to your privacy:
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{privacyPoints.map((point, index) => (
					<div key={index} className="flex items-start space-x-3">
						<Shield className="w-6 h-6 flex-shrink-0 mt-1" />
						<p className="text-blue-50">{point}</p>
					</div>
					))}
				</div>
				<div className="mt-8 text-center">
					<a href="#" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
					Read Our Full Privacy Policy
					</a>
				</div>
				</div>
			</div>
			</section>

			{/* Partnerships */}
			<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
				University Partnerships & Collaborations
				</h2>
				<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
				MindBridge works closely with various university departments to provide comprehensive 
				support for students. Our integrated approach ensures you receive holistic care.
				</p>
				<div className="grid md:grid-cols-2 gap-8">
				{partners.map((partner, index) => (
					<div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
					<div className="flex items-start space-x-4">
						<div className="flex-shrink-0 w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
						{partner.icon}
						</div>
						<div>
						<h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
						<p className="text-gray-600">{partner.description}</p>
						</div>
					</div>
					</div>
				))}
				</div>
			</div>
			</section>

			{/* Contact Information */}
			<section className="py-16">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-blue-50 rounded-2xl p-12">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Get In Touch</h2>
				<div className="grid md:grid-cols-3 gap-8 text-center">
					<div>
					<Phone className="w-10 h-10 text-blue-600 mx-auto mb-4" />
					<h3 className="font-bold text-gray-900 mb-2">Phone</h3>
					<p className="text-gray-600">+254 709 668 000</p>
					<p className="text-sm text-gray-500 mt-1">Mon-Fri, 8AM-5PM</p>
					</div>
					<div>
					<Mail className="w-10 h-10 text-blue-600 mx-auto mb-4" />
					<h3 className="font-bold text-gray-900 mb-2">Email</h3>
					<p className="text-gray-600">mindbridge@zetech.ac.ke</p>
					<p className="text-sm text-gray-500 mt-1">Response within 24hrs</p>
					</div>
					<div>
					<MapPin className="w-10 h-10 text-blue-600 mx-auto mb-4" />
					<h3 className="font-bold text-gray-900 mb-2">Location</h3>
					<p className="text-gray-600">Student Wellness Center</p>
					<p className="text-sm text-gray-500 mt-1">Zetech University Campus</p>
					</div>
				</div>
				<div className="mt-8 text-center">
					<p className="text-gray-700 mb-4"><strong>Crisis Support Available 24/7</strong></p>
					<p className="text-gray-600">If you're experiencing a mental health emergency, call our crisis line: <strong className="text-blue-600">+254 700 000 000</strong></p>
				</div>
				</div>
			</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-bold text-white mb-6">
				Ready to Take the First Step?
				</h2>
				<p className="text-xl text-blue-100 mb-8">
				Join hundreds of Zetech students who have found support through MindBridge
				</p>
				<button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl text-lg">
				Create Your Account
				</button>
			</div>
			</section>
		</div>
  );
}