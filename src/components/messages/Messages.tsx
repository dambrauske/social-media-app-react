import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.tsx";
import {useDispatch} from "react-redux";
import {setChats, setSelectedChat} from "../../features/chatSlice.tsx";


interface Props {
    selectedUserId: string | undefined
}

const Messages = ({selectedUserId}: Props) => {

    const chatsState = useAppSelector(state => state.chats)
    const user = useAppSelector(state => state.user.user)

    const selectedChat = chatsState?.chats?.find(c => Boolean(c.participants.find(p => p._id === selectedUserId)))

    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const token = useAppSelector(state => state.user.token)
    const chatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]
    const selectedChatMessages = selectedChat?.messages
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    console.log('selectedChat', selectedChat)
    console.log('selectedUser', selectedUser)
    console.log('chatParticipant', chatParticipant)
    console.warn('ALL CHAT STATE', chatsState)

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
            console.warn('Set selected chat messages.tsx 47', data)
            dispatch(setSelectedChat(data))
            setIsLoading(false)
        })

        socket().on('messageReceiverChats', (data) => {
            console.warn('messageReceiverChats')
            console.log('data', data)
            console.log('selectedChat', selectedChat)
            dispatch(setChats(data.receiverChats))

            if (selectedChat && selectedChat._id === data.chat._id) {
                console.warn('Set selected chat messages.tsx 59', data)
                dispatch(setSelectedChat(data.chat))
            }
        })

        return () => {
            socket().off('getSelectedChat')
            socket().off('selectedChat')
        }
    }, [])

    if (isLoading) return null

    return (
        <div className="bg-slate-50 md:w-3/4 grow flex flex-col h-full">
            <div className="font-semibold p-1">{chatParticipant?.username || selectedUser?.username}</div>
            <hr/>
            <div className="flex flex-col justify-between h-full overflow-auto">
                <div
                    className="overflow-y-auto custom-scrollbar flex grow overflow-x-hidden flex-col-reverse bg-slate-100 ">
                    {messagesSortedByDate && messagesSortedByDate.map((message) => (
                        <SingleMessage
                            key={message._id}
                            message={message}
                        />
                    ))}
                </div>
                <hr/>
                <SendMessageField/>
            </div>

        </div>
    );
};

export default Messages;
