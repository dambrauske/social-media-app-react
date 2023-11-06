import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {User, UserInitialState} from "../interfaces.tsx";
const token: string | null = localStorage.getItem('token')
const autoLogin: boolean = Boolean(localStorage.getItem('autoLogin'))

export const updateUserPublicProfile = createAsyncThunk('posts/updateUserImage', async ({token, image, bio}: {
    token: string | null,
    image: string | null,
    bio: string | null,
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
        body: JSON.stringify({image, bio}),
    }

    const response = await fetch('http://localhost:8000/updatePublicProfile', options)
        .then(res => res.json())

    console.log('user', response.data)
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
            setToken: (state, action: PayloadAction<string>) => {
                state.token = action.payload
                localStorage.setItem('token', state.token);
            },
            setUser: (state, action: PayloadAction<User | undefined>) => {
                state.user = action.payload
            },
            setAutoLogin: (state, action: PayloadAction<boolean>) => {
                state.autoLogin = action.payload
                localStorage.setItem('autoLogin', action.payload.toString());
            },
        }, extraReducers: (builder) => {

            builder.addCase(updateUserPublicProfile.pending, (state) => {
                state.loadingState = 'loading'
            })
            builder.addCase(updateUserPublicProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loadingState = 'idle';
                if (state.user) {
                    state.user = action.payload;
                }
                state.loadingMessage = ''
            })
            builder.addCase(updateUserPublicProfile.rejected, (state, action) => {
                state.loadingState = 'error'
                if (state.user) {
                    state.user = undefined;
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
