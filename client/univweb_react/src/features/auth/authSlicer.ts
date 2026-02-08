import {createSlice} from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

export const authenticationSlicer = createSlice({
    name: "authSli",
    initialState: {
        role: null,
        email:null,
        isAuthenticated:false,
        hasCheckedSession: false // this will be used for allowing requireAuth to run
    },
    reducers: {
        isLoggedIn: (state, action) =>{
            console.log(`Entering isLoggedIn`);
            // console.log(action); // this is going to be an object
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.isAuthenticated = true;
            state.hasCheckedSession = true;
        },
        isLoggedOut: (state)=>{
            console.log(`Entering isLoggedOut`);
            // console.log(state);
            state.role = null;
            state.email = null;
            state.isAuthenticated = false;
            state.hasCheckedSession = true
        },
        setCheckedSession: (state)=>{
            console.log(`state.hasCheckedSession: ${state.hasCheckedSession}`);
        },
        getCurrentState: (state)=>{
            console.log('Get Current State');
            console.log(current(state));
        }
    }
})
export const {isLoggedIn, isLoggedOut, getCurrentState} = authenticationSlicer.actions;
export default authenticationSlicer.reducer;

                                        