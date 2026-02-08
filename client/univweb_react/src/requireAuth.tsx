import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function requireAuth(ComposedComponent, allowedRoles?:string[])
{
    return function AuthenticatedRoute(props:any)
    {
        const navigate = useNavigate();

        // const state = useSelector((state)=>{return state});

        const isAuthenticated = useSelector((state)=>{
            // console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
            return state.myAuthSlicer.isAuthenticated;
        });
        
        const isRole = useSelector((state)=>{
            // console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
            return state.myAuthSlicer.role;
        });
        const hasCheckedSession = useSelector((state)=>{
            return state.myAuthSlicer.hasCheckedSession;
        })

        // console.log(`isAuthenticated ${isAuthenticated}: hasCheckedSession: ${hasCheckedSession}: isRole: ${isRole}`)
        // isAuthenticated true: hasCheckedSession: true: isRole: student

            
        // console.log(state);
        /*
        {
            "role": "student",
            "email": "alsonre@gmail.com",
            "isAuthenticated": true
        }
  */
        // console.log(`state.authSlicer.isAuthenticated: ${state.myAuthSlicer.isAuthenticated}`);
        // state.authSlicer.isAuthenticated: true

        useEffect(()=>{
            if (!hasCheckedSession) // it's false
            {
                console.log('Waiting session for check');
                return
            }

            if(isAuthenticated === false)
            {
                navigate("/login/student")
            }
            else if (!allowedRoles.includes(isRole)) // if the allowed roles does not include the one passed to the requireAuth(componentName, ['role'])
            {
                navigate("/")
            }     
        },[navigate, isAuthenticated])


        if (!hasCheckedSession)
        {
            return <div>Loading... </div>;
        }
        return isAuthenticated ? <ComposedComponent {...props}/> : null
    }
} 


export default requireAuth;