import SingleChat from "./SingleChat.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.tsx";
import {setChats, setSelectedChat} from "../../features/chatSlice.tsx";
const Chats = () => {

    const chats = useAppSelector(state => state.chats.chats)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        socket().emit('getChats', {token})

        socket().on('chats', (data) => {
            console.log('chats', data)
            dispatch(setChats(data))
            setIsLoading(false)
        })


        socket().on('messageSenderChats', (data) => {
            dispatch(setChats(data.senderChats))
            console.warn('Set selected chat chats.tsx 26', data)
            dispatch(setSelectedChat(data.chat))

        })

        return () => {
            socket().off('getChats')
            socket().off('messageSenderChats')
            socket().off('chats')
            dispatch(setChats(undefined))
        }
    }, [])

    if (isLoading) return null

    return (
        <div className="bg-slate-50 md:w-1/4 flex flex-col h-full">
            <div className="p-1">Chats</div>
            <hr/>
            <div className="overflow-y-auto custom-scrollbar flex flex-col">
                {chats && chats.map((chat) => (
                    <SingleChat
                        key={chat._id}
                        chat={chat}
                    />
                ))}
            </div>


        </div>
    );
};

export default Chats;
