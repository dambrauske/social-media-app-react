import {createSlice, createAsyncThunk, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Post} from "./userSlice.tsx";
interface PostsInitialState {
    posts: Post[] | undefined,
    singlePost: Post | undefined,
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

    console.log('all posts:', response.data)
    return response?.data as Post[]
})
export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async ({ token, postId }: { token: string | null, postId: string | null }) => {

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

    const response = await fetch('http://localhost:8000/post' + postId, options)
        .then(res => res.json())

    console.log('post:', response.data)
    return response?.data as Post
})
export const deleteSinglePost = createAsyncThunk('posts/deleteSinglePost', async ({ token, postId }: { token: string | null, postId: string | null }) => {

    if (token === null) {
        throw new Error('Token not available')
    }

    const options: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({postId}),
    };

    const response = await fetch('http://localhost:8000/deletePost', options)
        .then(res => res.json())

    console.log('posts after deletion of one post:', response.data)
    return response?.data as Post[]
})

export const addPost = createAsyncThunk('posts/addPost', async ({ token, image, title,  }: { token: string | null, image: string | null, title: string | null }) => {

    if (token === null) {
        throw new Error('Token not available')
    }

    const options: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({image, title}),
    };

    const response = await fetch('http://localhost:8000/addPost', options)
        .then(res => res.json())

    console.log('posts after adding one:', response.data)
    return response?.data as Post[]
})

export const postsSlice: Slice<PostsInitialState> = createSlice({
        name: "posts",
        initialState: {
            posts: undefined,
            singlePost: undefined,
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

            // ALL POSTS
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
                state.singlePost = undefined
                state.loadingMessage = action.error.message
            })

            builder.addCase(deleteSinglePost.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(deleteSinglePost.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loadingState = 'idle';
                state.posts = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(deleteSinglePost.rejected, (state, action) => {
                state.loadingState = 'error'
                state.posts = undefined
                state.loadingMessage = action.error.message
            })


            builder.addCase(addPost.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(addPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loadingState = 'idle';
                state.posts = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(addPost.rejected, (state, action) => {
                state.loadingState = 'error'
                state.posts = undefined
                state.loadingMessage = action.error.message
            })

            // SINGLE POST

            builder.addCase(fetchSinglePost.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loadingState = 'idle';
                state.singlePost = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(fetchSinglePost.rejected, (state, action) => {
                state.loadingState = 'error'
                state.singlePost = undefined
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
