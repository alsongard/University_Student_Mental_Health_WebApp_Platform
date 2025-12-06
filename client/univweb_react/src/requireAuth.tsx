import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function requireAuth(ComposedComponent)
{
    return function AuthenticatedRoute(props:any)
    {
        const navigate = useNavigate();

        const isAuthenticated = useSelector((state:any)=>{
            {
                console.log(`state value is: ${state.isLoggedIn}`)
                return state.isLoggedIn
            }
        })

        console.log(`isAuthenticated ${isAuthenticated}`)

        useEffect(()=>{
            if(isAuthenticated != true)
            {
                console.log('why run this if authenticated is True')
                navigate("/login/student")
            }
        },[navigate, isAuthenticated])

        return isAuthenticated ? <ComposedComponent {...props}/> : null
    }
} 


export default requireAuth;