import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice/loaderSlice";
import usersSlice from "./usersSlice/usersSlice";
import darkModeSlice from "./darkModeSlice/darkModeSlice";
const store = configureStore({
    reducer:{
        users:usersSlice,
        loader: loaderSlice,
        darkMode: darkModeSlice,
    }
})
export default store;