import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";
import {useEffect} from "react";
import socket from "../socket.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.tsx";
import {setChats, setSelectedChat} from "../features/chatSlice.tsx";

const MessagesPage = () => {

    const token = useAppSelector(state => state.user.token)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const selectedUserId = selectedUser._id
    const dispatch = useAppDispatch()



    useEffect(() => {

        socket().emit('getChats', ({token}))
        socket().emit('getSelectedChat', ({token, selectedUserId}))
        socket().on('chats', (data) => {
            console.log('data', data)
            dispatch(setChats(data))
        })

        socket().on('selectedChat', (data) => {
            console.log('data', data)
            dispatch(setSelectedChat(data))
        })

        return () => {
            socket().off('getChats')
            socket().off('chats')
        }

    }, [])


    return (
        <div>
            <Navbar/>
            <div className="flex">
                <Chats/>
                <Messages/>
            </div>
        </div>
    );
};

export default MessagesPage;
