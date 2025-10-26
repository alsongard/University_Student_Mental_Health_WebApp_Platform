import { Metadata } from 'next'; 
import StudentSideBar from "../components/studentDashboardNavBar";
import StudentDashboardHeader from '../components/studentDashboardHeader';

export default function Layout({ children }: { children: React.ReactNode })
{
    return ( 
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* <div className="w-full flex-none  border-red-300 border-1 md:w-64"> */}
            <StudentSideBar/>
            <div className="flex-grow  md:overflow-y-auto">
                <StudentDashboardHeader/>
                <div className="">{children}</div>
            </div>
        </div>
    );
}