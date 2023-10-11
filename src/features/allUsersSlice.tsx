import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {User, UserInitialState, UsersInitialState} from "../interfaces.tsx";
import {updateUserImage} from "./userSlice.tsx";

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async (token: string | null) => {

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

    const response = await fetch('http://localhost:8000/users', options)
        .then(res => res.json())

    console.log('all users:', response.data)
    return response?.data
})

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loadingState: 'idle',
        loadingMessage: '',
    } as UsersInitialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserInitialState[]>) => {
            state.users = action.payload
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllUsers.pending, (state) => {
            state.loadingState = 'loading'
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loadingState = 'idle';
            state.users = action.payload
            state.loadingMessage = ''
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loadingState = 'error'
            state.users = undefined
            state.loadingMessage = action.error.message
        })
    },


})
export const {
    setUsers
} = usersSlice.actions

export default usersSlice.reducer
