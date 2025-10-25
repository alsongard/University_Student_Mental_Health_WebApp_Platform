'use client'
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx";
import { useRouter } from "next/navigation"
export default function Header()
{
	const pathName = usePathname();
	const router = useRouter();
	const [displayLogin,setDisplayLogin] = useState(false);

	const handleDropDown = ()=>{
		setDisplayLogin((prevValue)=>{
			return !prevValue;
		})
	};

	const sendLoginProp = (data:string)=>{
		if (data === "student")
		{
			router.push("/login/student");
		}
		if (data === "psychiatrist")
		{
			router.push("/login/psychiatrist");
		}
	}
    return (
	// {/* Header */}
	<header className="bg-white shadow-sm sticky top-0 z-50">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
			<div className="flex items-center space-x-2">
				<Heart className="w-8 h-8 text-blue-600" />
				<span className="text-2xl font-bold text-gray-900">MindBridge</span>
			</div>
			<nav className="flex space-x-6">
				<Link href="/" className={clsx(pathName === "/"? "text-blue-600":"text-gray-600", " hover:text-blue-600 font-medium")}>Home</Link>
				<Link href="/about"  className={clsx(pathName === "/about"? "text-blue-600":"text-gray-600", " hover:text-blue-600 font-medium")}>About</Link>
				<Link href="/services"  className={clsx(pathName === "/services"? "text-blue-600":"text-gray-600", " hover:text-blue-600 font-medium")}>Services</Link>
				<Link href="/contact"  className={clsx(pathName === "/contact"? "text-blue-600":"text-gray-600", " hover:text-blue-600 font-medium")}>Contact</Link>
				<div className="flex flex-row relative ">
					<p className=" text-gray-600 hover:text-blue-600 font-medium">Login</p>
					<button onClick={handleDropDown} className={clsx(displayLogin == false ? "block": "hidden", "text-gray-500")}><ChevronDown/></button>
					<button onClick={handleDropDown} className={clsx(displayLogin == true ? "block": "hidden", "text-gray-500")}><ChevronUp/></button>

					<div className={clsx(displayLogin == true ? "block": "hidden", "absolute top-[30px] right-[0] w-[120px] bg-slate-200 rounded-md py-[5px] px-[10px]")}>
						<p onClick={()=>{sendLoginProp("student")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as student</p>
						<p onClick={()=>{sendLoginProp("psychiatrist")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as psychiatrist </p>
					</div>
				</div>
			</nav>
		</div>
	</header>
    )
}
