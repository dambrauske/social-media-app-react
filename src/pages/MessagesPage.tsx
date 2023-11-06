import Navbar from "../components/Navbar.tsx";
import Chats from "../components/messages/Chats.tsx";
import Messages from "../components/messages/Messages.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import socket from "../socket.tsx";
import {addToUnreadMessages, setChats} from "../features/chatSlice.tsx";
import {useAppDispatch} from "../hooks.tsx";

const MessagesPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {

        socket().on('messageReceiverChats', (data) => {
            console.warn('messageReceiverChats', data)
            dispatch(setChats(data.receiverChats))
            dispatch(addToUnreadMessages(data.newMessage))
        })

        socket().on('messageSenderChats', (data) => {
            dispatch(setChats(data.senderChats))
        })

        return () => {
            // socket().off('messageReceiverChats')
            socket().off('messageSenderChats')
        }
    })

    const {selectedUserId} = useParams()

    return (
        <div className="h-screen flex flex-col bg-slate-100">
            <Navbar/>
            <div className="grow flex overflow-hidden">
                <Chats/>
                {selectedUserId ?
                    <Messages
                        selectedUserId={selectedUserId}
                    />
                    :
                    null
                }
            </div>
        </div>
    );
};

export default MessagesPage;
