import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice.jsx";

export default configureStore({
    reducer: {
        user: userSliceReducer,
    }
})
