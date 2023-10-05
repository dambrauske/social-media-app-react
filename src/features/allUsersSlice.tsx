import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInitialState} from "./userSlice.tsx";
interface UsersInitialState {
    users: UserInitialState[]
}

export const usersSlice = createSlice({
        name: "users",
        initialState: {
            users: [],
        } as UsersInitialState,
        reducers: {
            setUsers: (state, action: PayloadAction<UserInitialState[]>) => {
                state.users = action.payload
            },
        }
    }
)
export const {
    setUsers
} = usersSlice.actions

export default usersSlice.reducer
