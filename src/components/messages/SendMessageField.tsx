import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import socket from "../../socket.tsx";
import {removeFromUnreadMessages, setChats} from "../../features/chatSlice.tsx";
import {useForm} from 'react-hook-form';
import {MessageForm} from "../../interfaces.tsx";

const SendMessageField = () => {

    const token = useAppSelector(state => state.user.token)
    const selectedUser = useAppSelector(state => state.users.selectedUser)
    const chats = useAppSelector(state => state.chats.chats)
    const selectedChat = chats?.find(c => Boolean(c.participants.find(p => p._id === selectedUser?._id)))

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<MessageForm>()

    const onSubmit = (data: MessageForm) => {
        console.log('sendMessage clicked')
        const message = data.message
        if (message && message.length > 0) {

            if (token === null) {
                throw new Error('Token not available')
            }

            let otherUserId = selectedUser?._id

            socket().emit('sendMessage', ({token, otherUserId, message}))

            socket().on('messageSenderChats', (data) => {
                dispatch(setChats(data.senderChats))
                console.warn('Set selected chat send message field.tsx 59', data)
                console.warn('messageSenderChats')
                console.log(data)
            })
        }

        reset()

        return () => {
            socket().off('sendMessage')
            socket().off('messageSenderChats')
        }
    }

    const handleTextareaClick = () => {
        dispatch(removeFromUnreadMessages(selectedChat))
    }


    return (
        <div className="p-4 flex gap-2 rounded bg-slate-100 w-full">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full gap-4">
                <textarea
                    id="message"
                    {...register("message",)}
                    className="w-full p-2 border rounded-lg focus:outline-none resize-none custom-scrollbar custom-scrollbar overflow-y-auto"
                    placeholder="Write a message..."
                    rows={4}
                    minLength={3}
                    maxLength={3000}
                    onClick={handleTextareaClick}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSubmit(onSubmit)()
                        }
                    }}
                />
                <button
                    type="submit"
                    className="flex items-end justify-end cursor-pointer">
                    <div
                        className="flex p-1 w-8 h-8 justify-center items-center rounded-full hover:bg-slate-200 hover:text-slate-50">
                        <i className="far fa-paper-plane text-slate-400"></i>
                    </div>
                </button>
            </form>
        </div>
    );
};

export default SendMessageField;
