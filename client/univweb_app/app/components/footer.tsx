import { Heart } from "lucide-react"
export default function Footer()
{
    return (
        // {/* Footer */}
		<footer className="bg-gray-900 text-white border-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid md:grid-cols-4 gap-8">
				<div>
				<div className="flex items-center space-x-2 mb-4">
					<Heart className="w-6 h-6" />
					<span className="text-xl font-bold">MindBridge</span>
				</div>
				<p className="text-gray-400">Connecting students with mental health support</p>
				</div>
				<div>
				<h4 className="font-bold mb-4">Quick Links</h4>
				<ul className="space-y-2 text-gray-400">
					<li><a href="#" className="hover:text-white transition">About Us</a></li>
					<li><a href="#" className="hover:text-white transition">Services</a></li>
					<li><a href="#" className="hover:text-white transition">FAQ</a></li>
				</ul>
				</div>
				<div>
				<h4 className="font-bold mb-4">Resources</h4>
				<ul className="space-y-2 text-gray-400">
					<li><a href="#" className="hover:text-white transition">Crisis Support</a></li>
					<li><a href="#" className="hover:text-white transition">Mental Health Tips</a></li>
					<li><a href="#" className="hover:text-white transition">Contact</a></li>
				</ul>
				</div>
				<div>
				<h4 className="font-bold mb-4">Emergency</h4>
				<p className="text-gray-400 mb-2">If you're in crisis:</p>
				<p className="text-white font-bold">Call 988 (Suicide & Crisis Lifeline)</p>
				</div>
			</div>
			<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
				<p>&copy; 2025 MindBridge. All rights reserved. | Privacy Policy | Terms of Service</p>
			</div>
			</div>
		</footer>
    )
}