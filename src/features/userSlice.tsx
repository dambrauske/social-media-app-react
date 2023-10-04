import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInitialState {
    username: string | undefined,
    image: string,
    token: string | null,
    autoLogin: boolean,
}

const token: string | null = localStorage.getItem('token')
const autoLogin: boolean = localStorage.getItem('autoLogin') === 'true'

export const userSlice = createSlice({
        name: "user",
        initialState: {
            username: undefined,
            image: './assets/blank-profile-picture',
            token,
            autoLogin: autoLogin || false,
        } as UserInitialState,
        reducers: {
            setToken: (state, action: PayloadAction<string | null>) => {
                state.token = action.payload
                if (action.payload) {
                    localStorage.setItem('token', action.payload);
                } else {
                    localStorage.removeItem('token');
                }
            },
            setUsername: (state, action: PayloadAction<string>) => {
                state.username = action.payload
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
} = userSlice.actions

export default userSlice.reducer
