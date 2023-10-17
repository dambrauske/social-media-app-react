import SingleChat from "./SingleChat.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {useEffect} from "react";
import socket from "../../socket.tsx";
import {setChats, setSelectedChat} from "../../features/chatSlice.tsx";
import {setSelectedUser} from "../../features/allUsersSlice.tsx";
import {Chat} from "../../interfaces.tsx";


const Chats = () => {

    const chats = useAppSelector(state => state.chats.chats)
    const user = useAppSelector(state => state.user.user)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const token = useAppSelector(state => state.user.token)
    const chatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]
    const chatParticipantId = chatParticipant?._id
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket().emit('getChats', {token});
        socket().on('chats', (data) => {
            dispatch(setChats(data));
        });
        return () => {
            socket().off('getChats')
            socket().off('chats')
        }
    }, [])


    const selectChat = (chat: Chat) => {
        console.log('selectChat clicked')
            dispatch(setSelectedChat(chat))
            dispatch(setSelectedUser(chatParticipant))
            socket().emit('getSelectedChat', ({token, chatParticipantId}))
    }


    return (
        <div className="bg-slate-100 w-1/4 h-screen">
            <div>Chats</div>
            {chats && chats.map((chat, i) => (
                <SingleChat
                    key={i}
                    onClick={() => selectChat(chat)}
                    chat={chat}
                />
            ))}
        </div>
    );
};

export default Chats;
