import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

export interface Post {
    _id: string,
    username: string,
    userId: string,
    date: string,
    image: string,
    title: string,
    comments: [string],
    likes: [string],
}

export interface UserInitialState {
    username: string | undefined,
    image: string | undefined,
    bio: string | undefined,
    token: string | null,
    autoLogin: boolean,
    userPosts: Post[] | undefined,
    loadingState: 'idle' | 'loading' | 'error',
    loadingMessage: string | undefined,
}

const token: string | null = localStorage.getItem('token')
const autoLogin: boolean = Boolean(localStorage.getItem('autoLogin'))

export const updateUserImage = createAsyncThunk('posts/updateUserImage', async ({token, newImage}: {
    token: string | null,
    newImage: string | null
}) => {

    if (token === null) {
        throw new Error('Token not available')
    }

    const options: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({newImage}),
    };

    const response = await fetch('http://localhost:8000/updateImage', options)
        .then(res => res.json())

    console.log('user image:', response.data)
    return response?.data
})

export const updateUserBio = createAsyncThunk('posts/updateBio', async ({token, updatedBio}: {
    token: string | null,
    updatedBio: string | null
}) => {

    if (token === null) {
        throw new Error('Token not available')
    }

    const options: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": token,
        },
        body: JSON.stringify({updatedBio}),
    };

    const response = await fetch('http://localhost:8000/updateBio', options)
        .then(res => res.json())

    console.log('user bio:', response.data)
    return response?.data
})

export const getUserPosts = createAsyncThunk('user/getUserPosts', async ({token, username}: {
    token: string | null, username: string | undefined
}) => {

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
    const allPosts = response?.data as Post[]
    return allPosts.filter(post => post.username === username)
})

export const userSlice = createSlice({
        name: "user",
        initialState: {
            username: undefined,
            image: undefined,
            token,
            bio: undefined,
            autoLogin,
            userPosts: undefined,
            loadingState: 'idle',
            loadingMessage: ''
        } as UserInitialState,
        reducers: {
            setToken: (state, action: PayloadAction<string | null>) => {
                state.token = action.payload
                localStorage.setItem('token', state.token);
            },
            setUsername: (state, action: PayloadAction<string>) => {
                state.username = action.payload
            },
            setBio: (state, action: PayloadAction<string>) => {
                state.bio = action.payload
            },
            setImage: (state, action: PayloadAction<string>) => {
                state.image = action.payload
            },
            setUserPosts: (state, action: PayloadAction<Post[] | undefined>) => {
                state.userPosts = action.payload
            },
            setAutoLogin: (state, action: PayloadAction<boolean>) => {
                state.autoLogin = action.payload
                localStorage.setItem('autoLogin', action.payload.toString());
            },
        }, extraReducers: (builder) => {

            // IMAGE

            builder.addCase(updateUserImage.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(updateUserImage.fulfilled, (state, action: PayloadAction<string>) => {
                state.loadingState = 'idle';
                state.image = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(updateUserImage.rejected, (state, action) => {
                state.loadingState = 'error'
                state.image = undefined
                state.loadingMessage = action.error.message
            })

            // BIO

            builder.addCase(updateUserBio.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(updateUserBio.fulfilled, (state, action: PayloadAction<string>) => {
                state.loadingState = 'idle';
                state.bio = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(updateUserBio.rejected, (state, action) => {
                state.loadingState = 'error'
                state.bio = undefined
                state.loadingMessage = action.error.message
            })

            // POSTS

            builder.addCase(getUserPosts.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(getUserPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loadingState = 'idle';
                state.userPosts = action.payload
                state.loadingMessage = ''
            })
            builder.addCase(getUserPosts.rejected, (state, action) => {
                state.loadingState = 'error'
                state.userPosts = undefined
                state.loadingMessage = action.error.message
            })
        },
    }
)
export const {
    setToken,
    setUsername,
    setAutoLogin,
    setImage,
    setBio,
    setUserPosts,
} = userSlice.actions

export default userSlice.reducer
