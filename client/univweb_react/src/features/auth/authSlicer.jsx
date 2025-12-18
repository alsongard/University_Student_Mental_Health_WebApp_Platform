import {createSlice} from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

export const authenticationSlicer = createSlice({
    name: "authSli",
    initialState: {
        role: null,
        email:null,
        isAuthenticated:false
    },
    reducers: {
        isLoggedIn: (state, action) =>{
            console.log(`Entering isLoggedIn`);
            // console.log(action); // this is going to be an object
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        isLoggedOut: (state)=>{
            console.log(`Entering isLoggedOut`);
            // console.log(state);
            state.role = null;
            state.email = null;
            state.isAuthenticated = true;
        },
        getCurrentState: (state)=>{
            console.log('Get Current State');
            console.log(current(state));
        }
    }
})
export const {isLoggedIn, isLoggedOut, getCurrentState} = authenticationSlicer.actions;
export default authenticationSlicer.reducer;

                                        