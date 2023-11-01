import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {Chat, ChatsInitialState, Message} from "../interfaces.tsx";

export const chatsSlice: Slice<ChatsInitialState> = createSlice({
        name: "chats",
        initialState: {
            chats: undefined,
            unreadMessages: [] as Message[],
        } as ChatsInitialState,
        reducers: {
            setChats: (state, action: PayloadAction<Chat[]>) => {
                state.chats = action.payload
            },
            addToUnreadMessages: (state, action: PayloadAction<Message>) => {
                const message = action.payload
                if (message) {
                    const alreadyUnread = state.unreadMessages.find(m => m._id === message._id)

                    if (!alreadyUnread) {
                        state.unreadMessages?.push(message)
                    }
                }
            },
            removeFromUnreadMessages: (state, action: PayloadAction<Chat>) => {
                const chat = action.payload
                if (chat) {
                    state.unreadMessages = state.unreadMessages.filter(m => m.chat !== chat._id)
                }
            },
        },
    }
)
export const {
    setChats,
    addToUnreadMessages,
    removeFromUnreadMessages,
} = chatsSlice.actions

export default chatsSlice.reducer
