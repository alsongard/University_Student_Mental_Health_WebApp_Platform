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
import { ThemeProvider } from "./components/themeContext";
export default function App()
{
	
	const dispatch = useDispatch();


	const apiUrl = import.meta.env.VITE_API_URL;
	// console.log(`this is userRole: ${userRole}`);
	// the below is a ADANCED SOLUTION TO REDUX PERSISTENCE

	// NOT IN USE FOR THE MOMENT
	async function CheckSession()
	{
		console.log('Running getVerifiedSession')
		try
		{
			// const response = await axios.get("http://localhost:5000/api/auth/me", {withCredentials:true})
			const response = await axios.get(`${apiUrl}/api/auth/me`, {withCredentials:true})
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
		const currentPath = window.location.pathname;
		const runCheckSessions = ['studentdashboard', 'psychiatristdashboard', 'studentdetails', 'psychiatristdetails'];
		const  publicPages = ["/", "about", "services", "contact", "login/student", "login/psychiatrist"]
		console.log(`currentPath: ${currentPath}`);
		if (runCheckSessions.includes("currentPath"))
		{
			CheckSession();
		}
	}, [dispatch]);

	
	const ProtectedStudentDashboard = requireAuth(StudentDashboard, ['student']);
	const ProtectedPsychiatristDashboard = requireAuth(PsychiatristDashboard, ['psychiatrist', 'Counselor']);
	const ProtectedPsychiatristDetails = requireAuth(PsychiatristDetails, ['psychiatrist', 'Counselor']);
	const ProtectedStudentDetails = requireAuth(StudentDetailsRegistration);
	// how to handle persistence

	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<div><Header/><Outlet/><Footer/></div>}>
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
		</ThemeProvider>
	)	
}
