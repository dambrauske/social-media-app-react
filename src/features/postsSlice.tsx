import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post} from "./userSlice.tsx";
interface PostsInitialState {
    posts: [Post] | undefined,
}

export const postsSlice = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
        } as PostsInitialState,
        reducers: {
            setAllPosts: (state, action: PayloadAction<[Post]>) => {
                state.posts = action.payload
            },
        }
    }
)
export const {
    setAllPosts
} = postsSlice.actions

export default postsSlice.reducer
