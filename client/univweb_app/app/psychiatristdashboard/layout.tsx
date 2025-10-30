
import PsychiatristSidebar from "@/app/components/pyschiatristSideBar";

export default function Layout({ children }: { children: React.ReactNode })
{
    return ( 
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <PsychiatristSidebar/>
            <div className="flex-grow  md:overflow-y-auto">
                <div className="">{children}</div>
            </div>
        </div>
    );
}