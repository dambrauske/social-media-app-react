import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice.tsx";
import usersSliceReducer from "./features/allUsersSlice.tsx";
import postsSliceReducer from "./features/postsSlice.jsx";
import chatsSliceReducer from "./features/chatSlice.tsx";

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        users: usersSliceReducer,
        posts: postsSliceReducer,
        chats: chatsSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
