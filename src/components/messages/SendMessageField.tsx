import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import socket from "../../socket.tsx";
import {setChats, setSelectedChat} from "../../features/chatSlice.tsx";
import {useForm} from 'react-hook-form';
import {MessageForm} from "../../interfaces.tsx";

const SendMessageField = () => {

    const user = useAppSelector(state => state.user.user)
    const token = useAppSelector(state => state.user.token)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const existingChatParticipant = selectedChat?.participants.filter(participant => participant.username !== user?.username)[0]

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = (data: MessageForm) => {
        console.log('sendMessage clicked')
        const message = data.message

        if (message && message.length > 0) {

            if (token === null) {
                throw new Error('Token not available')
            }

            let otherUserId

            if (!existingChatParticipant) {
                otherUserId = selectedUser?._id
            } else {
                otherUserId = existingChatParticipant?._id
            }
            socket().emit('addMessage', ({token, otherUserId, message}))
            socket().on('chatsAfterAddingMessage', (data) => {
                dispatch(setChats(data.chats))
                console.log('data chats', data)
                dispatch(setSelectedChat(data.chat))
            })
        }

        reset()

        return () => {
            socket().off('addMessage')
            socket().off('chatsAfterAddingMessage')
        }
    }


    return (
        <div className="p-2 flex gap-2 rounded bg-slate-100 w-full">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full gap-4">
                <textarea
                    id="message"
                    {...register("message",)}
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none custom-scrollbar"
                    placeholder="Write a message..."
                    rows={3}
                    minLength={3}
                    maxLength={1000}
                />
                <button
                    type="submit"
                    className="flex items-end justify-end cursor-pointer">
                    <div
                        className="flex p-1 w-6 h-6 justify-center items-center rounded-full hover:bg-slate-100 hover:text-slate-50">
                        <i className="far fa-paper-plane text-slate-400"></i>
                    </div>
                </button>
            </form>
        </div>
    );
};

export default SendMessageField;
