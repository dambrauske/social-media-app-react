import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice.tsx";
import usersSliceReducer from "./features/allUsersSlice.tsx";
import postsSliceReducer from "./features/postsSlice.jsx";

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        users: usersSliceReducer,
        posts: postsSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
