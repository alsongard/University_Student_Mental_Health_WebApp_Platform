import { Heart } from "lucide-react"
export default function Header()
{
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
			<div className="flex items-center space-x-2">
				<Heart className="w-8 h-8 text-blue-600" />
				<span className="text-2xl font-bold text-gray-900">MindBridge</span>
			</div>
			<div className="flex space-x-4">
				<button className="px-6 py-2 text-blue-600 font-semibold hover:text-blue-700 transition">
				Login
				</button>
				<button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
				Sign Up
				</button>
			</div>
			</div>
		</header>
    )
}