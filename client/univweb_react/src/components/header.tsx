import { Heart, Sun, Moon , ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import clsx from "clsx";
import { NavLink, Outlet , useNavigate} from "react-router-dom";
import { Link } from "lucide-react";
export default function Header(props:any)
{
	const {darkMode, setDarkMode} = props;

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
		}
		if (data === "psychiatrist")
		{
			navigate("/login/psychiatrist");
		}
	}

    return (
	// {/* Header */}
	<div>
		<header className="bg-white dark:bg-gray-600 shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<Heart className="w-8 h-8 text-blue-600" />
					<span className="text-2xl font-bold dark:text-blue-400 text-gray-900">MindBridge</span>
				</div>
				<nav className="flex space-x-6">
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
					
					<div className="flex flex-row relative ">
						<p className=" text-gray-600 hover:text-blue-600 dark:text-white font-medium">Login</p>
						<button onClick={handleDropDown} className={clsx(displayLogin == false ? "block": "hidden", "text-gray-500 dark:text-white")}><ChevronDown/></button>
						<button onClick={handleDropDown} className={clsx(displayLogin == true ? "block": "hidden", "text-gray-500 dark:text-white")}><ChevronUp/></button>

						<div className={clsx(displayLogin == true ? "block": "hidden", "absolute top-[30px] right-[0] w-[120px] bg-slate-200 rounded-md py-[5px] px-[10px]")}>
							<p onClick={()=>{sendLoginProp("student")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as student</p>
							<p onClick={()=>{sendLoginProp("psychiatrist")}} className="text-left text-gray-600 hover:text-blue-600 text-[15px]">as psychiatrist </p>
						</div> 
					</div>
					{
						darkMode === true &&
							(<Sun 
								onClick={()=>{

									console.log(`darkMode: ${darkMode}`)
									return setDarkMode(false)}}
							/>)
					}
					{
						darkMode === false &&
						(<Moon 
								onClick={()=>{
									console.log(`darkMode: ${darkMode}`)
									return setDarkMode(true)}}
						/>)
					}
				</nav>
			</div>
		</header>  
		<Outlet/>                       
	</div>
    )
}
