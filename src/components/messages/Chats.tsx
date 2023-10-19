import SingleChat from "./SingleChat.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.tsx";
import {setChats} from "../../features/chatSlice.tsx";
const Chats = () => {

    const chats = useAppSelector(state => state.chats.chats)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        dispatch(setChats(undefined))
        socket().emit('getChats', {token});
        socket().on('chats', (data) => {
            dispatch(setChats(data))
            setIsLoading(false)
        })

        return () => {
            socket().off('getChats')
            socket().off('chats')
        }
    }, [])

    if (isLoading) return null

    return (
        <div className="bg-slate-50 w-1/4">
            <div>Chats</div>
            {chats && chats.map((chat) => (
                <SingleChat
                    key={chat._id}
                    chat={chat}
                />
            ))}
        </div>
    );
};

export default Chats;
