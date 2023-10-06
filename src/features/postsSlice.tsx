import {createSlice, createAsyncThunk, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Post} from "./userSlice.tsx";
interface PostsInitialState {
    posts: Post[] | undefined,
    postUpdateModal: boolean,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (token: string | null) => {

    if (token === null) {
        throw new Error('Token not available')
    }

    const options: RequestInit = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": token,
        },
    };

    const response = await fetch('http://localhost:8000/posts', options)
        .then(res => res.json())

    console.log(response, token)
    return response?.data as Post[]
})

export const postsSlice: Slice<PostsInitialState> = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
            postUpdateModal: false,
            loadingState: 'idle',
            loadingMessage: ''
        } as PostsInitialState,
        reducers: {
            setAllPosts: (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload
            },
            setPostUpdateModal: (state, action: PayloadAction<boolean>) => {
                state.postUpdateModal = action.payload
            },
        },
        extraReducers: (builder) => {
            builder.addCase(fetchAllPosts.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loadingState = 'idle';
                state.posts = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(fetchAllPosts.rejected, (state, action) => {
                state.loadingState = 'error'
                state.posts = undefined
                state.loadingMessage = action.error.message
            })
        }
    }
)
export const {
    setAllPosts,
    setPostUpdateModal,
} = postsSlice.actions

export default postsSlice.reducer
