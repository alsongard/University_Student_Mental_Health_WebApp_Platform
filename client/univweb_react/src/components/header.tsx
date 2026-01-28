import {  Menu, X, Heart, Sun, Moon , ChevronDown, ChevronUp } from "lucide-react"
import {  } from 'lucide-react';
import { useState } from "react"
import clsx from "clsx";
import { NavLink , replace, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "./themeContext";

export default function Header(props:any)
{
	const isAuthenticated = useSelector((state)=>{
		// console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
		return state.myAuthSlicer.isAuthenticated;
	})
	const authRole = useSelector((state)=>{
		// console.log(`state.myAuthSlicer.role: ${state.myAuthSlicer.role}`);
		return state.myAuthSlicer.role
	});
	
	const {darkMode, setDarkMode} = useTheme()
	const navigate = useNavigate()
	// const router = useRouter();
	const [displayLogin,setDisplayLogin] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleDropDown = ()=>{
		setDisplayLogin((prevValue)=>{
			return !prevValue;
		})
		setTimeout(()=>{
			setDisplayLogin(false)
		}, 5000)
	};

	const sendLoginProp = (data:string)=>{
		if (data === "student")
		{
			navigate("/login/student");
			// window.location.reload();
		}
		if (data === "psychiatrist")
		{
			navigate("/login/psychiatrist");
			// window.location.reload();
		}
	}


	// {/* <header className="bg-white bg-gradient-to-r from-white  dark:from-slate-900 to-white dark:to-slate-900  dark:border-b-1 dark:border-white shadow-sm sticky top-0 z-50"> */}
	// {/* <header className="bg-white bg-gradient-to-r from-white   to-white   shadow-sm sticky top-0 z-50"> */}
	// {/* <header className="bg-white bg-gradient-to-r from-white to-white shadow-sm sticky top-0 z-50 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700/50"> */}
	// {/* <header className="bg-white bg-gradient-to-r from-white to-white shadow-sm sticky top-0 z-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:shadow-gray-700/50"> */}
    return (
	// {/* Header */}
		<div>
			<header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-900 dark:shadow-gray-700/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						{/* Logo */}
						<div className="flex items-center space-x-2">
							<Heart className="w-8 h-8 text-blue-600" />
							<span className="text-2xl font-bold dark:text-blue-400 text-gray-900">MindBridge</span>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-6">
							<NavLink
								to="/" 
								className={({isActive}) =>
									clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")
								}
							>
								Home
							</NavLink>
							<NavLink
								to="/about"  
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")}
							>
								About
							</NavLink>
							<NavLink 
								to="/services"  
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")}
							>
								Services
							</NavLink>
							<NavLink 
								to="/contact"  
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")}
							>
								Contact
							</NavLink>
							
							{isAuthenticated === true && authRole === 'student' && (
								<NavLink 
									to="/studentdashboard"  
									className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")}
								>
									Student Dashboard
								</NavLink>					
							)}
							
							{isAuthenticated === true && authRole === 'psychiatrist' && (
								<NavLink 
									to="/psychiatristdashboard"  
									className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")}
								>
									Psychiatrist Dashboard
								</NavLink>		
							)}

							{/* Login Dropdown */}
							{isAuthenticated === false && (
								<div className="flex flex-row relative">
									<p className="text-gray-600 hover:text-blue-600 dark:text-white font-medium cursor-pointer">Login</p>
									<button onClick={handleDropDown} className="text-gray-500 dark:text-white">
										{displayLogin ? <ChevronUp /> : <ChevronDown />}
									</button>

									<div className={clsx(
										displayLogin ? "block" : "hidden", 
										"absolute top-[30px] right-[0] w-[140px] bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 px-3"
									)}>
										<p onClick={() => sendLoginProp("student")} className="text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm py-1 cursor-pointer">
											as student
										</p>
										<p onClick={() => sendLoginProp("psychiatrist")} className="text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm py-1 cursor-pointer">
											as psychiatrist
										</p>
									</div> 
								</div>
							)}
							
							{/* Theme Toggle */}
							<button onClick={() => setDarkMode(!darkMode)} className="p-1">
								{darkMode ? (
									<Sun className="text-white w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>
						</nav>

						{/* Mobile Menu Button & Theme Toggle */}
						<div className="flex lg:hidden items-center space-x-4">
							<button onClick={() => setDarkMode(!darkMode)} className="p-1">
								{darkMode ? (
									<Sun className="text-white w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>
							<button 
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="text-gray-600 dark:text-white"
							>
								{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
							</button>
						</div>
					</div>

					{/* Mobile Navigation */}
					{mobileMenuOpen && (
						<nav className="lg:hidden mt-4 pb-4 space-y-3">
							<NavLink
								to="/" 
								onClick={() => setMobileMenuOpen(false)}
								className={({isActive}) =>
									clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")
								}
							>
								Home
							</NavLink>
							<NavLink
								to="/about"
								onClick={() => setMobileMenuOpen(false)}
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")}
							>
								About
							</NavLink>
							<NavLink 
								to="/services"
								onClick={() => setMobileMenuOpen(false)}
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")}
							>
								Services
							</NavLink>
							<NavLink 
								to="/contact"
								onClick={() => setMobileMenuOpen(false)}
								className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")}
							>
								Contact
							</NavLink>
							
							{isAuthenticated === true && authRole === 'student' && (
								<NavLink 
									to="/studentdashboard"
									onClick={() => setMobileMenuOpen(false)}
									className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")}
								>
									Student Dashboard
								</NavLink>					
							)}
							
							{isAuthenticated === true && authRole === 'psychiatrist' && (
								<NavLink 
									to="/psychiatristdashboard"
									onClick={() => setMobileMenuOpen(false)}
									className={({isActive}) => clsx(isActive ? "text-blue-600" : "text-gray-600", "block hover:text-blue-600 dark:text-white font-medium py-2")}
								>
									Psychiatrist Dashboard
								</NavLink>		
							)}

							{/* Mobile Login Options */}
							{isAuthenticated === false && (
								<div className="pt-2 border-t border-gray-200 dark:border-gray-700">
									<p className="text-gray-600 dark:text-white font-medium pb-2">Login</p>
									<button 
										onClick={() => {
											sendLoginProp("student");
											setMobileMenuOpen(false);
										}}
										className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
									>
										as student
									</button>
									<button 
										onClick={() => {
											sendLoginProp("psychiatrist");
											setMobileMenuOpen(false);
										}}
										className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
									>
										as psychiatrist
									</button>
								</div>
							)}
						</nav>
					)}
				</div>
			</header>  
		</div>
    )
}
