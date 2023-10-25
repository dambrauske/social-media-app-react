import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {useEffect, useState} from "react";
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
    const [isLoading, setIsLoading] = useState(true)

    console.log('selectedChat', selectedChat)
    console.log('selectedUser', selectedUser)
    console.log('chatParticipant', chatParticipant)

    // if no selected chat, find chat by recipientId
    // else use selected chat

    let messagesSortedByDate
    if (selectedChatMessages) {
        messagesSortedByDate = [...selectedChatMessages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
    }

    useEffect(() => {
        if (token === null) {
            throw new Error('Token not available')
        }

        socket().emit('getSelectedChat', ({token, selectedUserId}))
        socket().on('selectedChat', (data) => {
            console.log('selectedChat', data)
            dispatch(setSelectedChat(data))
            setIsLoading(false)
        })

        return () => {
            socket().off('getSelectedChat')
            socket().off('selectedChat')
            dispatch(setSelectedChat(undefined))
        }
    }, [])

    if (isLoading) return null

    return (
        <div className="p-2 bg-slate-100 w-3/4 flex flex-col h-full">
            <div className="font-semibold">{chatParticipant?.username || selectedUser?.username}</div>
            <hr/>
            <div className="flex flex-col justify-between h-full overflow-auto">
                <div className="overflow-y-auto custom-scrollbar flex grow overflow-x-hidden flex-col-reverse">
                    {messagesSortedByDate && messagesSortedByDate.map((message) => (
                        <SingleMessage
                            key={message._id}
                            message={message}
                        />
                    ))}
                </div>

                <SendMessageField/>
            </div>

        </div>
    );
};

export default Messages;
