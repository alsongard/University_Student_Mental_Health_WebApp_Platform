import { Heart, Sun, Moon , ChevronDown, ChevronUp } from "lucide-react"
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
		
			<header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-900 dark:shadow-gray-700/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<Heart className="w-8 h-8 text-blue-600" />
						<span className="text-2xl font-bold dark:text-blue-400 text-gray-900">MindBridge</span>
					</div>
					<nav className="flex items-center space-x-6">
						<NavLink
							to="/" 
							className={({isActive})=>
								clsx(isActive ? "text-blue-600" : "text-gray-600", "hover:text-blue-600 dark:text-white font-medium")
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/about"  
							className={({isActive}) => clsx( isActive ? "text-blue-600":"text-gray-600", " hover:text-blue-600 dark:text-white font-medium")}
						>
							About
						</NavLink>

						<NavLink 
							to="/services"  
							className={({isActive}) => clsx(isActive ? "text-blue-600":"text-gray-600", " hover:text-blue-600 dark:text-white font-medium")}
						>
							Services
						</NavLink>
						<NavLink 
							to="/contact"  
							className={({isActive}) => clsx(isActive ? "text-blue-600":"text-gray-600", " hover:text-blue-600 dark:text-white font-medium")}>
								Contact
						</NavLink>
						{
							isAuthenticated === true && authRole === 'student' &&
							(
									<NavLink 
										to="/studentdashboard"  
										className={({isActive}) => clsx(isActive ? "text-blue-600":"text-gray-600", " hover:text-blue-600 dark:text-white font-medium")}>
											Student Dashboard
									</NavLink>					
							)
						}
						{
							isAuthenticated === true && authRole === 'psychiatrist' &&
							<NavLink 
								to="/psychiatristdashboard"  
								className={({isActive}) => clsx(isActive ? "text-blue-600":"text-gray-600", " hover:text-blue-600 dark:text-white font-medium")}>
									Psychiatrist Dashboard
							</NavLink>		
						}

						{/* Login Dropdown */}
						{
							isAuthenticated === false &&
							(

								<div className="flex flex-row relative ">
									<p className=" text-gray-600 hover:text-blue-600 dark:text-white font-medium">Login</p>
									<button onClick={handleDropDown} className={clsx(displayLogin == false ? "block": "hidden", "text-gray-500 dark:text-white")}><ChevronDown/></button>
									<button onClick={handleDropDown} className={clsx(displayLogin == true ? "block": "hidden", "text-gray-500 dark:text-white")}><ChevronUp/></button>

									<div className={clsx(displayLogin == true ? "block": "hidden", "absolute top-[30px] right-[0] w-[120px] bg-slate-200 rounded-md py-[5px] px-[10px]")}>
										<p onClick={()=>{sendLoginProp("student")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as student</p>
										<p onClick={()=>{sendLoginProp("psychiatrist")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as psychiatrist </p>
									</div> 
								</div>
							)
						}
						
						<div>
							{
								darkMode === true &&
									(<Sun 
										className={clsx(darkMode ? "text-white" : "")}
										onClick={()=>{

											// console.log(`darkMode: ${darkMode}`)
											return setDarkMode(false)}}
									/>)
							}
							{
								darkMode === false &&
								(
									<Moon
										className={clsx(darkMode ? "text-white" : " ")}
										onClick={()=>{
											// console.log(`darkMode: ${darkMode}`)
											return setDarkMode(true)}}
									/>
								)
							}
						</div>
					</nav>
				</div>
			</header>  
		
    )
}
