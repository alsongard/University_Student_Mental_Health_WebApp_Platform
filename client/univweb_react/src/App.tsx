import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home/homePage";
import AboutPage from "./pages/about/AboutPage";
import ServicesPage from "./pages/services/servicesPage";
import ContactPage from "./pages/contact/ContactPage";
import AuthForms from "./pages/login/LoginPage";
import StudentDashboard from "./pages/studentdashboard/studentDashboardPage";
import Footer from "./components/footer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import requireAuth from "./requireAuth";
import reducerer from "./store/reducer";
import PsychiatristDashboard from "./pages/psychiatristdashboard/psychiatristPage";
import axios from "axios";
import ErrorpPage from "./pages/error/page";
import StudentDetailsRegistration from "./pages/studentdetails/studentDetails";
export default function App()
{
	
	const dispatch = useDispatch();

	// we use localstorage
	const emailExist = localStorage.getItem("email")


	console.log(`this is emailExist: ${emailExist}`);
	// the below is a ADANCED SOLUTION TO REDUX PERSISTENCE
	const [darkMode, setDarkMode] = useState(false);

	async function CheckSession()
	{
		console.log('Running getVerifiedSession')
		try
		{
			const response = await axios.get("http://localhost:5000/api/student/getMe", {withCredentials:true})
			if (response.status === 200)
			{
				dispatch({type: 'ON_LOGGED_IN'});
			}

		}
		catch(err)
		{
			console.log(`Error: ${err}`)
		}
	}
	useEffect(()=>{
		const result = window.matchMedia('(prefers-color-scheme: dark)')
		setDarkMode(result.matches);
		if (emailExist)
		{
			dispatch({type: 'ON_LOGGED_IN'});
		}
	}, [dispatch]);

	
	const ProtectedStudentDashboard = requireAuth(StudentDashboard);
	const ProtectedPsychiatristDashboard = requireAuth(PsychiatristDashboard);

	// how to handle persistence
	

	const dark = darkMode == true  ? 'dark': ''
	return (
		<div className={`${dark}`}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<div><Header darkMode={darkMode} setDarkMode={setDarkMode}/><Outlet/><Footer/></div>}>
						<Route index element={<Home/>}/>
						<Route path="/about" element={<AboutPage/>}/>
						<Route path='/services' element={<ServicesPage/>}/>
						<Route path="/contact" element={<ContactPage/>}/>
						<Route path="/login/:id" element={<AuthForms/>}/>
						<Route path="/studentdashboard" element={<ProtectedStudentDashboard/>}/>
						<Route path="/psychiatristdashboard" element={<ProtectedPsychiatristDashboard/>}/>
						<Route path="/studentdetails" element={<StudentDetailsRegistration/>}/>
						<Route path="*" element={<ErrorpPage/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)	
}

