import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {RefObject, useRef} from "react";
import socket from "../../socket.tsx";
import {setChats, setSelectedChat} from "../../features/chatSlice.tsx";

const SendMessageField = () => {

    const user = useAppSelector(state => state.user.user)
    const token = useAppSelector(state => state.user.token)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const chatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]
    const chatParticipantId = chatParticipant?._id
    const messageRef: RefObject<HTMLTextAreaElement> = useRef(null)

    const dispatch = useAppDispatch()

    const sendMessage = () => {
        console.log('sendMessage clicked')
        const message: string | undefined = messageRef.current?.value
        if (message && message.length > 0) {

            if (token === null) {
                throw new Error('Token not available')
            }
            socket().emit('addMessage', ({token, chatParticipantId, message}))

            socket().on('chatsAfterAddingMessage', (data) => {
                dispatch(setChats(data.chats))
                console.log('data chats', data)
                dispatch(setSelectedChat(data.chat))
            })
        }

        if (messageRef.current) {
            messageRef.current.value = ''
        }

        return () => {
            socket().off('addMessage')
            socket().off('chatsAfterAddingMessage')
        }
    }


    return (
        <div className="p-2 flex gap-2 rounded bg-slate-100 w-full">

            <div className="flex w-full gap-4">
                <textarea
                    ref={messageRef}
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none custom-scrollbar"
                    placeholder="Write a message..."
                    rows={3}
                />
                <div
                    onClick={sendMessage}
                    className="flex items-end justify-end cursor-pointer">
                    <div
                        className="flex p-1 w-6 h-6 justify-center items-center rounded-full hover:bg-slate-100 hover:text-slate-50">
                        <i className="far fa-paper-plane text-slate-400"></i>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SendMessageField;
