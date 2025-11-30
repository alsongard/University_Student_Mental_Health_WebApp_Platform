import { configureStore } from "@reduxjs/toolkit";
import reducerer from "./reducer";

export const store = configureStore({reducer: reducerer});