import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "../features/auth/authSlicer"

export default configureStore({
    reducer: {
        myAuthSlicer: authSlicer
    }
})