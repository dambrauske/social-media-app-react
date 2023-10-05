import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInitialState {
    username: string | undefined,
    image: string | undefined,
    bio: string | undefined,
    token: string | null,
    autoLogin: boolean,
}

const token: string | null = localStorage.getItem('token')
const autoLogin: boolean = Boolean(localStorage.getItem('autoLogin'))

export const userSlice = createSlice({
        name: "user",
        initialState: {
            username: undefined,
            image: undefined,
            token,
            bio: undefined,
            autoLogin,
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
            setAutoLogin: (state, action: PayloadAction<boolean>) => {
                state.autoLogin = action.payload
                localStorage.setItem('autoLogin', action.payload.toString());
            },
        }
    }
)
export const {
    setToken,
    setUsername,
    setAutoLogin,
    setImage,
    setBio,
} = userSlice.actions

export default userSlice.reducer
