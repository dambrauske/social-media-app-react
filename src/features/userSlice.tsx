import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInitialState {
    username: string | undefined,
    image: string | undefined,
    token: string | null,
}

const token = localStorage.getItem('token')
export const userSlice = createSlice({
        name: "user",
        initialState: {
            username: undefined,
            image: undefined,
            token,
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
        }
    }
)
export const {
    setToken,
    setUsername,
} = userSlice.actions

export default userSlice.reducer
