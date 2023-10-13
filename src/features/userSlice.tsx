import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {User, UserInitialState} from "../interfaces.tsx";

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


export const userSlice = createSlice({
        name: "user",
        initialState: {
            user: undefined,
            token,
            autoLogin,
            loadingState: 'idle',
            loadingMessage: ''
        } as UserInitialState,
        reducers: {
            setToken: (state, action: PayloadAction<string | null>) => {
                state.token = action.payload
                localStorage.setItem('token', state.token);
            },
            setUser: (state, action: PayloadAction<User>) => {
                state.user = action.payload
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
                if (state.user) {
                    state.user.image = action.payload;
                }
                state.loadingMessage = ''
            })
            builder.addCase(updateUserImage.rejected, (state, action) => {
                state.loadingState = 'error'
                if (state.user) {
                    state.user.image = '';
                }
                state.loadingMessage = action.error.message
            })

            // BIO

            builder.addCase(updateUserBio.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(updateUserBio.fulfilled, (state, action: PayloadAction<string>) => {
                state.loadingState = 'idle';
                if (state.user) {
                    state.user.bio = action.payload
                }
                state.loadingMessage = ''
            })
            builder.addCase(updateUserBio.rejected, (state, action) => {
                state.loadingState = 'error'
                if (state.user) {
                    state.user.bio = ''
                }
                state.loadingMessage = action.error.message
            })
        },
    }
)
export const {
    setToken,
    setUser,
    setAutoLogin,
} = userSlice.actions

export default userSlice.reducer
