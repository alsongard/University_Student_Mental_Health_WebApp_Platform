import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function requireAuth(ComposedComponent, allowedRoles?:string[])
{
    return function AuthenticatedRoute(props:any)
    {
        const navigate = useNavigate();

        const isAuthenticated = useSelector((state)=>{
            // console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
            return state.myAuthSlicer.isAuthenticated;
        });
        
        const isRole = useSelector((state)=>{
            // console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
            return state.myAuthSlicer.role;
        });

        // console.log(`isAuthenticated ${isAuthenticated}`)

        useEffect(()=>{
            if(isAuthenticated === false)
            {
                navigate("/login/student")
            }
            if (!allowedRoles.includes(isRole)) // if the allowed roles does not include the one passed to the requireAuth(componentName, ['role'])
            {
                navigate("/")
            }
            
        },[navigate, isAuthenticated])

        return isAuthenticated ? <ComposedComponent {...props}/> : null
    }
} 


export default requireAuth;