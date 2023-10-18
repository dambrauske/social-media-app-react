import SingleChat from "./SingleChat.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {useEffect} from "react";
import socket from "../../socket.tsx";
import {setChats} from "../../features/chatSlice.tsx";
const Chats = () => {

    const chats = useAppSelector(state => state.chats.chats)
    const token = useAppSelector(state => state.user.token)
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


    return (
        <div className="bg-slate-100 w-1/4 h-screen">
            <div>Chats</div>
            {chats && chats.map((chat, i) => (
                <SingleChat
                    key={i}
                    chat={chat}
                />
            ))}
        </div>
    );
};

export default Chats;
