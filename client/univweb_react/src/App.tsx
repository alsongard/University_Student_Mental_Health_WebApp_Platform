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
import {isLoggedIn, isLoggedOut} from "./features/auth/authSlicer";
import PsychiatristDetails from "./pages/psychiatristDetails/psychiatristDetails";
import TrialStudentSessions from "./pages/trials/TrialPage";
import {Analytics} from "@vercel/analytics/react";
import OtpPage from "./pages/otp/otpPage";

export default function App()
{
	
	const dispatch = useDispatch();



	// console.log(`this is userRole: ${userRole}`);
	// the below is a ADANCED SOLUTION TO REDUX PERSISTENCE
	const [darkMode, setDarkMode] = useState(false);

	// NOT IN USE FOR THE MOMENT
	async function CheckSession()
	{
		console.log('Running getVerifiedSession')
		try
		{
			// const response = await axios.get("http://localhost:5000/api/auth/me", {withCredentials:true})
			const response = await axios.get("https://university-student-psychiatrist.onrender.com/api/auth/me", {withCredentials:true})
			if (response.status === 200)
			{
				// console.log('User is authenticated');
				// console.log(response.data.data);
				const {email, role} = response.data.data;
				const myPayload  = { role, email};
				dispatch(isLoggedIn(myPayload));
			}

		}
		catch(err)
		{
			console.log(`Error: ${err}`);
			dispatch(isLoggedOut());
		}
	};

	useEffect(()=>{
		const result = window.matchMedia('(prefers-color-scheme: dark)')
		setDarkMode(result.matches);
	}, []);
	
	useEffect(()=>{
		CheckSession();
	}, [dispatch]);

	
	const ProtectedStudentDashboard = requireAuth(StudentDashboard, ['student']);
	const ProtectedPsychiatristDashboard = requireAuth(PsychiatristDashboard, ['psychiatrist', 'Counselor']);
	const ProtectedPsychiatristDetails = requireAuth(PsychiatristDetails, ['psychiatrist', 'Counselor']);
	const ProtectedStudentDetails = requireAuth(StudentDetailsRegistration);
	// how to handle persistence
	

	const dark = darkMode == true  ? 'dark': ''
	return (
		<div className={`${dark}`}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<div><Header darkMode={darkMode} setDarkMode={setDarkMode}/><Outlet/><Footer/></div>}>
						<Route index element={<Home/>}/>
						<Route path="about" element={<AboutPage/>}/>
						<Route path='services' element={<ServicesPage/>}/>
						<Route path="contact" element={<ContactPage/>}/>
						<Route path="login/:id" element={<AuthForms/>}/>
						<Route path="studentdashboard" element={<ProtectedStudentDashboard/>}/>
						<Route path="psychiatristdashboard" element={<ProtectedPsychiatristDashboard/>}/>
						<Route path="studentdetails" element={<ProtectedStudentDetails/>}/>
						<Route path="psychiatristdetails" element={<ProtectedPsychiatristDetails/>}/>
						<Route path="otp" element={<OtpPage/>}/>
						<Route path="*" element={<ErrorpPage/>}/>
					</Route>
				</Routes>
				<Analytics/>
			</BrowserRouter>
		</div>
	)	
}
