import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {useEffect} from "react";
import socket from "../../socket.tsx";
import {useDispatch} from "react-redux";
import {setSelectedChat} from "../../features/chatSlice.tsx";


interface Props {
    selectedUserId: string | undefined
}

const Messages = ({selectedUserId}: Props) => {

    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const user = useAppSelector(state => state.user.user)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const token = useAppSelector(state => state.user.token)
    const chatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]
    const selectedChatMessages = selectedChat?.messages
    const dispatch = useDispatch()

    console.log('selectedChat', selectedChat)

    // if no selected chat, find chat by recipientId
    // else use selected chat

    let messagesSortedByDate
    if (selectedChatMessages) {
        messagesSortedByDate =  [...selectedChatMessages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    useEffect(() => {
        if (token === null) {
            throw new Error('Token not available')
        }

        dispatch(setSelectedChat(undefined))

        socket().emit('getSelectedChat', ({token, selectedUserId}))
        socket().on('selectedChat', (data) => {
            console.log('selectedChat', data)
            dispatch(setSelectedChat(data))
        })

        return () => {
            socket().off('getSelectedChat');
            socket().off('selectedChat');
        }
    }, [])


    return (
        <div className="w-3/4 p-2">
            <div className="font-semibold">{chatParticipant?.username || selectedUser?.username}</div>
            {messagesSortedByDate && messagesSortedByDate.map((message, i) => (
                <SingleMessage
                key={i}
                message={message}
                />
            ))}

            <SendMessageField/>
        </div>
    );
};

export default Messages;
