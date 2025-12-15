import {createSlice} from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

export const authenticationSlicer = createSlice({
    name: "authSli",
    initialState: {
        token: null,
        role: null,
        isAuthenticated:false
    },
    reducers: {
        isLoggedIn: (state, action) =>{
            console.log(`Entering isLoggedIn`);
            console.log(action); // this is going to be an object

            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        isLoggedOut: (state)=>{
            console.log(`Entering isLoggedOut`);
            console.log(state);
            state.token = null;
            state.role = null;
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

                                        