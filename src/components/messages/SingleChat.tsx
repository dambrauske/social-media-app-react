import {Chat} from "../../interfaces.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {formatDateFromTimestamp} from "../../helperFunctions.tsx";
import {useNavigate} from "react-router-dom";
import {setSelectedUser} from "../../features/allUsersSlice.tsx";
import {removeFromUnreadMessages} from "../../features/chatSlice.tsx";

type Props = {
    chat: Chat,
}
const SingleChat = ({chat}: Props) => {

    const user = useAppSelector(state => state.user.user)
    const chatParticipant = chat.participants.filter(participant => participant.username !== user?.username)[0]
    const unreadMessages = useAppSelector(state => state.chats.unreadMessages)
    const recipientId = chatParticipant._id
    const messages = chat.messages
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    let lastMessage

    if (messages) {
        const messagesSortedByDate = [...messages].sort((objA, objB) => {
            return new Date(objB.createdAt!).getTime() - new Date(objA.createdAt!).getTime()
        })
        lastMessage = messagesSortedByDate[0]
    }

    const selectChat = (chat: Chat) => {
        dispatch(setSelectedUser(chatParticipant))
        dispatch(removeFromUnreadMessages(chat))
        navigate(`/messages/${recipientId}`)
    }

    const containsUnreadMessage = (currentChat: Chat) => {
       return unreadMessages.find(m => m.chat === currentChat._id)
    }

    return (
        <div
            onClick={() => selectChat(chat)}
            className={`flex gap-2 items-center p-2 cursor-pointer ${containsUnreadMessage(chat) ? 'bg-slate-200' : 'bg-slate-100'}`}>
            <div className="flex justify-center items-center">
                <div className="w-10 h-10">
                    <img className="w-full h-full rounded-full object-cover" src={chatParticipant?.image} alt=""/>
                </div>
            </div>
            <div className="hidden md:flex md:flex-col w-5/6">
                <div className="font-semibold">{chatParticipant?.username}</div>
                <div>
                    <div className={`text-sm whitespace-nowrap overflow-ellipsis overflow-hidden ${containsUnreadMessage(chat) ? 'font-bold' : 'font-normal'}`}>{lastMessage?.message}</div>
                    <div className="text-xs text-slate-400 text-right">{formatDateFromTimestamp(lastMessage?.createdAt)}</div>
                </div>
            </div>

        </div>
    );
};

export default SingleChat;
