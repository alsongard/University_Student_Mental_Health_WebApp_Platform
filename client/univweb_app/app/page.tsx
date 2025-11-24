import Image from "next/image";
import Slider from "./components/slider";
import { Shield, Heart, Clock, Users, CheckCircle } from "lucide-react";
export default function Home()
{
	const stats = [
		{ number: "1 in 3", text: "students experience mental health challenges" },
		{ number: "75%", text: "of mental health issues begin before age 24" },
		{ number: "80%", text: "of students feel overwhelmed by responsibilities" }
	];
	const benefits = [
		"Free or subsidized sessions for enrolled students",
		"No referral needed - direct access to care",
		"Crisis support available",
		"Individual and group therapy options",
		"Academic accommodation support when needed"
	];

	const features = [
		{
			icon: <Shield className="w-8 h-8" />,
			title: "Complete Confidentiality",
			description: "Your privacy is our priority. All sessions are completely confidential and secure."
		},
		{
			icon: <Clock className="w-8 h-8" />,
			title: "Flexible Scheduling",
			description: "Book appointments that fit your academic schedule with easy online booking."
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Professional Support",
			description: "Connect with qualified university psychiatrists who understand student life."
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: "Student-Centered Care",
			description: "Tailored mental health support designed specifically for university students."
		}
	];
	return (
    <div className="">
        <Slider/>
		{/* Statistics Section */}
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
				Why Mental Health Support Matters
			</h2>
			<div className="grid md:grid-cols-3 gap-8">
				{stats.map((stat, index) => (
				<div key={index} className="text-center p-6 bg-blue-50 rounded-xl">
					<div className="text-5xl font-bold text-blue-600 mb-4">{stat.number}</div>
					<p className="text-gray-700 text-lg">{stat.text}</p>
				</div>
				))}
			</div>
			</div>
		</section>
		{/* Features Section */}
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
				How MindBridge Supports You
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{features.map((feature, index) => (
				<div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
					<div className="text-blue-600 mb-4">{feature.icon}</div>
					<h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
					<p className="text-gray-600">{feature.description}</p>
				</div>
				))}
			</div>
			</div>
		</section>
		{/* Benefits Section */}
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<div>
				<h2 className="text-3xl font-bold text-gray-900 mb-6">
					Student Benefits & Services
				</h2>
				<div className="space-y-4">
					{benefits.map((benefit, index) => (
					<div key={index} className="flex items-start space-x-3">
						<CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
						<p className="text-gray-700 text-lg">{benefit}</p>
					</div>
					))}
				</div>
				<button className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md">
					Create Your Account
				</button>
				</div>
				<div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
				<h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started is Easy</h3>
				<ol className="space-y-4">
					<li className="flex items-start space-x-3">
					<span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
					<p className="text-gray-700 pt-1">Create your free student account</p>
					</li>
					<li className="flex items-start space-x-3">
					<span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
					<p className="text-gray-700 pt-1">Browse available psychiatrists and time slots</p>
					</li>
					<li className="flex items-start space-x-3">
					<span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
					<p className="text-gray-700 pt-1">Book your first appointment</p>
					</li>
				</ol>
				</div>
			</div>
			</div>
		</section>

		{/* CTA Section */}
		<section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 className="text-4xl font-bold text-white mb-6">
				Take the First Step Towards Better Mental Health
			</h2>
			<p className="text-xl text-blue-100 mb-8">
				Join thousands of students who have found support through MindBridge
			</p>
			<button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl text-lg">
				Sign Up Now - It's Free
			</button>
			</div>
		</section>
    </div>
  );
}
