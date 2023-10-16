import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Chat, ChatsInitialState} from "../interfaces.tsx";


export const chatsSlice: Slice<ChatsInitialState> = createSlice({
        name: "chats",
        initialState: {
            chats: undefined,
            selectedChat: undefined,
        } as ChatsInitialState,
        reducers: {
            setChats: (state, action: PayloadAction<Chat[]>) => {
                state.chats = action.payload
            },
            setSelectedChat: (state, action: PayloadAction<Chat>) => {
                state.selectedChat = action.payload
            },
        },
    }
)
export const {
    setChats,
    setSelectedChat
} = chatsSlice.actions

export default chatsSlice.reducer
