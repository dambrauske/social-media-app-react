import SingleMessage from "./SingleMessage.tsx";
import SendMessageField from "./SendMessageField.tsx";
import {useAppSelector} from "../../hooks.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.tsx";
import {useDispatch} from "react-redux";
import {setChats} from "../../features/chatSlice.tsx";

interface Props {
    selectedUserId: string | undefined
}

const Messages = ({selectedUserId}: Props) => {

    const chats = useAppSelector(state => state.chats)
    const selectedChat = chats?.chats?.find(c => Boolean(c.participants.find(p => p._id === selectedUserId)))
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const token = useAppSelector(state => state.user.token)
    const selectedChatMessages = selectedChat?.messages
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)


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
            setIsLoading(false)

        socket().on('messageReceiverChats', (data) => {
            console.warn('messageReceiverChats')
            console.log('data', data)
            dispatch(setChats(data.receiverChats))
        })

        return () => {
            socket().off('messageReceiverChats')
        }
    }, [])

    if (isLoading) return null


    return (
        <div className="bg-slate-50 md:w-3/4 grow flex flex-col h-full">
            <div className="font-semibold p-1">{selectedUser?.username}</div>
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
